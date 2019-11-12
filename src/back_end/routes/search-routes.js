require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

const { util } = require(`../utilities`);
const { spotifyservice } = require(`../services`);
const { youtubeservice } = require(`../services`);

router.get(`/:searchQuery`, async (req, res) => {
	try {
		const searchQuery = util.encodeSpaces(req.params.searchQuery);
		const spotifyRes = await spotifyservice.search(searchQuery);
		const youtubeRes = await youtubeservice.search(searchQuery);
		return res.send([...spotifyRes, ...youtubeRes]);
	} catch (err) {
		console.log(err.stack);
		return res.status(500).send(process.env.ERR_500);
	}
});

module.exports = router;
