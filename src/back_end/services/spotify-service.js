require(`dotenv`).config();

const { preq } = require(`../utilities`);
const { AuthToken, ArtistImage } = require(`../models`);

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
    url: `${process.env.SPOTIFY_SEARCH_URI}?q=${searchQuery}&type=${searchType || "album,artist,track"}&limit=${process.env.QUERY_LIMIT}`,
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
  if(format === false){
    return body;
  }
  return await formatResults(body);
};

const attemptFindArtistImage = async artist => {
  let artists = (await search(artist, "artist", false)).artists;
  let image = false;
  if(artists.items.length > 0){
    const spotifyArtist = artists.items[0];
    ArtistImage.findOneAndUpdate({ spotifyId: spotifyArtist.id }, { spotifyId: spotifyArtist.id, stringName: artist, imageLink: spotifyArtist.images[0].url }, {upsert: true}).exec();
    image = spotifyArtist.images[0].url;
  }

  return image;
}

const getArtistImage = async artist => {
  const image = await ArtistImage.findOne({stringName: artist});
  return image.imageLink;
}

const setAristImage = async (artist, spotifyId, imageLink) => {
  await ArtistImage.create({
    stringName: artist,
    spotifyId,
    imageLink
  })
}

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

module.exports = {
  search,
  isLoggedIn,
  attemptFindArtistImage,
  getArtistImage,
  setAristImage
};
