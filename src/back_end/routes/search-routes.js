require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

const { util } = require(`../utilities`);
const { spotifyservice, youtubeservice, bandcampservice, soundcloudservice } = require(`../services`);

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

router.get(`/:searchQuery`, async (req, res) => {
  try {
    const searchQuery = util.encodeSpaces(req.params.searchQuery);
    let spotifyRes = [];
    if(await spotifyservice.isLoggedIn()){
      spotifyRes = await spotifyservice.search(searchQuery);
    }
    const youtubeRes = await youtubeservice.search(searchQuery);
    const bandcampRes = await bandcampservice.search(decodeURIComponent(searchQuery));
    const soundcloudRes = await soundcloudservice.search(searchQuery);
    // TODO combine and jumble results into a single array to send to front-end
    return res.send(shuffle([...spotifyRes, ...youtubeRes, ...bandcampRes, ...soundcloudRes]));
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send(process.env.ERR_500);
  }
});

module.exports = router;
