require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

const { util } = require(`../utilities`);
const { spotifyservice } = require(`../services`);
const { youtubeservice } = require(`../services`);

router.get(`/:searchQuery`, async (req, res) => {
  try {
    const searchQuery = util.encodeSpaces(req.params.searchQuery);
    let spotifyRes = [];
    if(await spotifyservice.isLoggedIn()){
      spotifyRes = await spotifyservice.search(searchQuery);
    }
    const youtubeRes = await youtubeservice.search(searchQuery);
    // TODO combine and jumble results into a single array to send to front-end
    return res.send([...spotifyRes, ...youtubeRes]);
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send(process.env.ERR_500);
  }
});

module.exports = router;
