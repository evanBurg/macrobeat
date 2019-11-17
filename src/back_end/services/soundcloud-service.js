require(`dotenv`).config();
const MPV_LOCATION = process.env.MPV_LOCATION || "e:/mpv/mpv.exe";
const mpvAPI = require("node-mpv");
const { preq } = require(`../utilities`);
const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID
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
    if(format === false){
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

const mpv = new mpvAPI({
  audio_only: true,
  binary: MPV_LOCATION
});

const play = async (url, timestampCallback) => {
  mpv.load(url, "replace");
  mpv.on("timeposition", timestampCallback);
};

const pause = async () => {
  mpv.pause();
};

const resume = async () => {
  mpv.resume();
};

const stop = async () => {
  mpv.stop();
};

// const scrub = async () => {};

module.exports = {
  search,
  play,
  pause,
  resume,
  stop
  // scrub
};
