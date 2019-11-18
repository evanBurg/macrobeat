require(`dotenv`).config();
const { preq } = require(`../utilities`);
const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const URL = process.env.SOUNDCLOUD_API_URL;

const search = async (searchQuery, format) => {
  let options = {
    url: `${URL}?q=${searchQuery}&client_id=${CLIENT_ID}`,
    json: true
  };
  let body = await preq.get(options);
  if (
    body.error &&
    (body.error.status === 401 ||
      body.error.message === `The access token expired`)
  ) {
    return [];
  }
  if (format === false) {
    return body;
  }
  return await formatResults(body);
};

const formatResults = async rawResults => {
  let songs = [];
  for (let i = 0; i < rawResults.length && i < process.env.QUERY_LIMIT; i++) {
    const id = rawResults[i].permalink_url;
    const title = rawResults[i].title;
    const artist = rawResults[i].user.username;
    const artistImage = rawResults[i].user.avatar_url;
    const image = rawResults[i].artwork_url;
    const lengthS = rawResults[i].duration || 0;
    const song = {
      id,
      title,
      artist,
      artistImage,
      image,
      lengthS,
      source: `soundcloud`
    };
    songs.push(song);
  }
  return songs;
};

const isLoggedIn = () => {
  return !!CLIENT_ID;
};

class SoundCloudPlayer {
  constructor(mpvInstance) {
    this.mpv = mpvInstance;
  }

  play(song) {
    this.mpv.load(song.ID, "replace");
  }

  pause() {
    this.mpv.pause();
  }

  resume() {
    this.mpv.resume();
  }

  stop() {
    this.mpv.stop();
  }
}

module.exports = {
  search,
  SoundCloudPlayer,
  isLoggedIn
  // scrub
};
