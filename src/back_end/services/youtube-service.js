require(`dotenv`).config();
const ytsearch = require(`yt-search`);
const stream = require(`youtube-audio-stream`);
const decoder = require(`lame`).Decoder;
const Speaker = require(`speaker`);
const ffmpegPath = require(`@ffmpeg-installer/ffmpeg`).path;
const ffmpeg = require(`fluent-ffmpeg`);
ffmpeg.setFfmpegPath(ffmpegPath);

const { preq } = require(`../utilities`);

const speaker = new Speaker({
	channels: 2, // 2 channels
	bitDepth: 16, // 16-bit samples
	sampleRate: 44100 // 44,100 Hz sample rate
});

const fallbackSearch = (searchQuery) => {
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

const fallbackFormatResults = async (res) => {
	let songs = [];
	const rawResults = res.videos;
	for (let i = 0; i < rawResults.length && i < process.env.QUERY_LIMIT; i++) {
		const artist = rawResults[i].author.channelName;
		const track = rawResults[i].title;
		const lengthS = rawResults[i].seconds;
		const id = rawResults[i].videoId;
		const song = {
			artist,
			track,
			lengthS,
			id,
			source: `youtube`
		};
		songs.push(song);
	}
	return songs;
};

const search = async (searchQuery) => {
	const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${process.env.QUERY_LIMIT}&order=relevance&q=${searchQuery}&type=video&key=${process.env.YOUTUBE_API_KEY}`;
	let options = {
		url,
		json: true
	};
	let results = await preq.get(options);
	if(results.error){
		results = await fallbackSearch(searchQuery);
		results = await fallbackFormatResults(results);
	} else {
		results = await formatResults(results);
	}
	return results;
};

const formatResults = async (res) => {
	let songs = [];
	const rawResults = res.items;
	for (let i = 0; i < rawResults.length && i < process.env.QUERY_LIMIT; i++) {
		const id = rawResults[i].id.videoId;
		const track = rawResults[i].snippet.title;
		const artist = rawResults[i].snippet.channelTitle;
		const lengthS = rawResults[i].seconds;
		const song = {
			id,
			track,
			artist,
			lengthS,
			source: `youtube`
		};
		songs.push(song);
	}
	return songs;
};

let g_stream = null;
const play = async (videoId) => {
	const url = `http://www.youtube.com/watch?v=${videoId}`;
	g_stream = stream(url);
	g_stream.pipe(decoder()).pipe(speaker);
};

const pause = async () => {
	if (g_stream) {
		g_stream.unpipe();
		g_stream.pause();
	}
};

const resume = async () => {
	if (g_stream) {
		g_stream.pipe(decoder()).pipe(speaker);
		g_stream.resume();
	}
};

const stop = async () => {
	if (g_stream) {
		g_stream.unpipe();
		g_stream = null;
	}
};

module.exports = {
	search,
	play,
	pause,
	resume,
	stop
};
