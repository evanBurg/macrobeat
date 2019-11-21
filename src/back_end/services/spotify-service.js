require(`dotenv`).config();

const { preq, util } = require(`../utilities`);
const { AuthToken, ArtistImage } = require(`../models`);
const Nightmare = require("nightmare");

const refreshToken = async () => {
  const doc = await AuthToken.findOne({ serviceName: `spotify` }).exec();
  const options = {
    url: process.env.SPOTIFY_TOKEN_URI,
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString(`base64`)}`
    },
    form: {
      grant_type: `refresh_token`,
      refresh_token: doc.refreshToken
    },
    json: true
  };
  const body = await preq.post(options);
  const authToken = body.access_token;
  await AuthToken.findOneAndUpdate(
    { serviceName: `spotify` },
    { authToken }
  ).exec();
};

const search = async (searchQuery, searchType, format) => {
  let doc = await AuthToken.findOne({ serviceName: `spotify` }).exec();
  let options = {
    url: `${
      process.env.SPOTIFY_SEARCH_URI
    }?q=${searchQuery}&type=${searchType || "album,artist,track"}&limit=${
      process.env.QUERY_LIMIT
    }`,
    headers: { Authorization: `Bearer ${doc.authToken}` },
    json: true
  };
  let body = await preq.get(options);
  if (
    body.error &&
    (body.error.status === 401 ||
      body.error.message === `The access token expired`)
  ) {
    await refreshToken();
    doc = await AuthToken.findOne({ serviceName: `spotify` }).exec();
    options.headers = { Authorization: `Bearer ${doc.authToken}` };
    body = await preq.get(options);
  }
  if (format === false) {
    return body;
  }
  return await formatResults(body);
};

const attemptFindArtistImage = async artist => {
  let artists = (await search(artist, "artist", false)).artists;
  let image = false;
  if (artists.items.length > 0) {
    const spotifyArtist = artists.items[0];
    ArtistImage.findOneAndUpdate(
      { spotifyId: spotifyArtist.id },
      {
        spotifyId: spotifyArtist.id,
        stringName: artist,
        imageLink: spotifyArtist.images[0].url
      },
      { upsert: true }
    ).exec();
    image = spotifyArtist.images[0].url;
  }

  return image;
};

const getArtistImage = async artist => {
  const image = await ArtistImage.findOne({ stringName: artist });
  return image.imageLink;
};

const setAristImage = async (artist, spotifyId, imageLink) => {
  await ArtistImage.create({
    stringName: artist,
    spotifyId,
    imageLink
  });
};

const formatResults = async res => {
  let songs = [];

  const rawSongs = res.tracks.items;
  for (let i = 0; i < rawSongs.length && i < process.env.QUERY_LIMIT; i++) {
    const id = rawSongs[i].id;
    const title = rawSongs[i].name;
    const artist = rawSongs[i].artists[0].name;
    const album = rawSongs[i].album.name;
    // first image is always highest quality
    const image = rawSongs[i].album.images[0].url;
    const lengthS = Math.round(rawSongs[i].duration_ms / 1000);
    const song = {
      id,
      title,
      artist,
      album,
      image,
      lengthS,
      source: `spotify`
    };
    songs.push(song);
  }
  return songs;
};

const isLoggedIn = async () => {
  const token = await AuthToken.findOne({ serviceName: `spotify` });
  return token ? true : false;
};

class SpotifyPlayer {
  constructor(token, updateStateCallback) {
    this.updateStateCallback = updateStateCallback;
    this.token = token;
    this.playing = false;
    this.stateLoop = false;
  }

  async play(song) {
    let token = this.token;
    let options = {
      url: `https://api.spotify.com/v1/me/player/play?device_id=${process.env.SPOTIFY_DEVICE_ID}`,
      headers: { Authorization: `Bearer ${token.authToken}` },
      json: { uris: [`spotify:track:${song.ID}`] }
    };
    let response = await preq.put(options);

    if(response && response.error && response.error.status === 401){
      await refreshToken();
      return this.play(song);
    }

    this.playing = true;
    this.getState(this);

    if (!this.stateLoop) {
      const objectThis = this;
      this.stateLoop = setInterval(async function() {
        await objectThis.getState(objectThis);
      }, 3000);
    }
  }

  async getState(objectThis) {
    if (objectThis.playing) {
      try {
        let token = objectThis.token;
        let options = {
          url: `https://api.spotify.com/v1/me/player/currently-playing`,
          headers: { Authorization: `Bearer ${token.authToken}` },
          json: true
        };
        let state = await preq.get(options);

        if(state && state.error && state.error.status === 401){
          await refreshToken();
          return objectThis.getState(objectThis);
        }

        if (state.progress_ms && state.item.duration_ms) {
          objectThis.updateStateCallback({
            position: parseInt(state.progress_ms) / 1000,
            duration: parseInt(state.item.duration_ms) / 1000
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  async pause() {
    let token = this.token;
    let options = {
      url: `https://api.spotify.com/v1/me/player/pause?device_id=${process.env.SPOTIFY_DEVICE_ID}`,
      headers: { Authorization: `Bearer ${token.authToken}` }
    };
    let response = await preq.put(options);

    if(response && response.error && response.error.status === 401){
      await refreshToken();
      return this.pause();
    }
    this.playing = false;
  }

  async resume() {
    let token = this.token;
    let options = {
      url: `https://api.spotify.com/v1/me/player/play?device_id=${process.env.SPOTIFY_DEVICE_ID}`,
      headers: { Authorization: `Bearer ${token.authToken}` }
    };
    let response = await preq.put(options);

    if(response && response.error && response.error.status === 401){
      await refreshToken();
      return this.resume();
    }
    this.playing = true;
  }

  stop() {
    this.pause();
  }

  async setVolume(volume) {
    let token = this.token;
    let options = {
      url: `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}&device_id=${process.env.SPOTIFY_DEVICE_ID}`,
      headers: { Authorization: `Bearer ${token.authToken}` },
      json: true
    };
    let response = await preq.put(options);

    if(response && response.error && response.error.status === 401){
      await refreshToken();
      return this.setVolume(volume);
    }
  }
}

module.exports = {
  search,
  isLoggedIn,
  attemptFindArtistImage,
  getArtistImage,
  setAristImage,
  SpotifyPlayer
};
