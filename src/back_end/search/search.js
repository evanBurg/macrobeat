const ytSearch = require("../../dist/yt-search.js");

const search = async (query) => {
  let songs = [];

  //TODO: Check if logged in to services before searching
  if(true) songs = [...songs, ...await YouTubeSearchWrapper(query)];

  return songs;
};

const YouTubeSearchWrapper = (query) => {
    return new Promise((res, rej) => {
        ytSearch(query, (e, r) => { 
            if(e) rej(e); 
            res(r.videos);
        });
    });
};

module.exports.search = search;
