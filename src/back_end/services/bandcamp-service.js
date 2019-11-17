require(`dotenv`).config();
const BandcampSearch = require("bandcamp-scraper");
const MPV_LOCATION = process.env.MPV_LOCATION || "e:/mpv/mpv.exe";
const mpvAPI = require("node-mpv");
const MAX_RESULTS = parseInt(process.env.QUERY_LIMIT) || 10;
const MAX_PAGE = parseInt(process.env.BANDCAMP_MAX_PAGE) || 7

const search = (searchQuery, page) => {
  let params = {
    query: searchQuery,
    page: page || 1
  };
  return new Promise((resolve, reject) => {
    let tracks = [];
    BandcampSearch.search(params, async (error, searchResults) => {
      if (error) {
        reject(error);
      } else {
          let allTracksFound = false;
          searchResults.forEach(item => {
              if(item.type === "track"){
                  tracks.push(item);
              }
              if(tracks.length === MAX_RESULTS){
                allTracksFound = true;
              }
          })
          if(allTracksFound || params.page > MAX_PAGE){
            resolve(await formatResults(tracks))
          }else{
            resolve(await search(params.query, params.page + 1));
          }
      }
    });
  });
};

const formatResults = async rawResults => {
  let songs = [];
  for (let i = 0; i < rawResults.length && i < process.env.QUERY_LIMIT; i++) {
    const id = rawResults[i].url;
    const title = rawResults[i].name;
    const album = rawResults[i].album;
    const artist = rawResults[i].artist;
    const image = rawResults[i].imageUrl;
    const lengthS = rawResults[i].seconds || 0;
    const song = {
      id,
      title,
      artist,
      album,
      image,
      lengthS,
      source: `bandcamp`
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
