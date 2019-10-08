const ytSearch = require("../../dist/yt-search.min.js");

const search = async (query, source) => {
  let songs = [];

  switch (source) {
    case "YouTube":
      songs = await YouTubeSearchWrapper(query);
      break;
  }

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
