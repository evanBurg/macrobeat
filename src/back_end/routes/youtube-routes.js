require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

const { youtubeservice } = require(`../services`);

// just for testing, chill

router.get(`/play/:videoId`, async (req, res) => {
	try {
		await youtubeservice.play(req.params.videoId);
		return res.send(`playing`);
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

router.get(`/pause`, async (req, res) => {
	try {
		await youtubeservice.pause();
		return res.send(`pausing`);
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

router.get(`/resume`, async (req, res) => {
	try {
		await youtubeservice.resume();
		return res.send(`resuming`);
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

router.get(`/stop`, async (req, res) => {
	try {
		await youtubeservice.stop();
		return res.send(`stoping`);
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

module.exports = router;
