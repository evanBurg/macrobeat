require(`dotenv`).config();
const ytsearch = require(`yt-search`);
const { preq } = require(`../utilities`);

const fallbackSearch = searchQuery => {
  const options = {
    query: searchQuery,
    pageStart: 1,
    pageEnd: 2
  };
  return new Promise((resolve, reject) => {
    ytsearch(options, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const fallbackFormatResults = async res => {
  let songs = [];
  const rawResults = res.videos;
  for (let i = 0; i < rawResults.length && i < process.env.QUERY_LIMIT; i++) {
    const id = rawResults[i].videoId;
    const title = rawResults[i].title;
    const artist = rawResults[i].author.channelName;
    const image = `https://i.ytimg.com/vi/${id}/default.jpg`;
    const lengthS = rawResults[i].seconds;
    const song = {
      id,
      title,
      artist,
      image,
      lengthS,
      source: `youtube`
    };
    songs.push(song);
  }
  return songs;
};

const search = async searchQuery => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${process.env.QUERY_LIMIT}&order=relevance&q=${searchQuery}&type=video&key=${process.env.YOUTUBE_API_KEY}`;
  let options = {
    url,
    json: true
  };
  let results = await preq.get(options);
  if (results.error) {
    results = await fallbackSearch(searchQuery);
    results = await fallbackFormatResults(results);
  } else {
    results = await formatResults(results);
  }
  return results;
};

const formatResults = async res => {
  let songs = [];
  const rawResults = res.items;
  for (let i = 0; i < rawResults.length && i < process.env.QUERY_LIMIT; i++) {
    const id = rawResults[i].id.videoId;
    const title = rawResults[i].snippet.title;
    const artist = rawResults[i].snippet.channelTitle;
    const image = rawResults[i].snippet.thumbnails.default.url;
    const lengthS = rawResults[i].seconds || 0;
    const song = {
      id,
      title,
      artist,
      image,
      lengthS,
      source: `youtube`
    };
    songs.push(song);
  }
  return songs;
};

class YouTubePlayer {
  constructor(mpvInstance){
    this.mpv = mpvInstance;
  }

  play(song){
    const url = `http://www.youtube.com/watch?v=${song.ID}`;
    this.mpv.load(url, "replace");
  };
  
  pause(){this.mpv.pause();}
  
  resume(){this.mpv.resume();}
  
  stop(){this.mpv.stop();}
}

// const scrub = async () => {};

module.exports = {
  search,
  YouTubePlayer
  // scrub
};
