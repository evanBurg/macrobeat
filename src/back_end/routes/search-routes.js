require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();

const { util } = require(`../utilities`);
const { spotifyservice, youtubeservice, bandcampservice, soundcloudservice } = require(`../services`);

router.get(`/:searchQuery`, async (req, res) => {
  try {
    const searchQuery = util.encodeSpaces(req.params.searchQuery);
    let promises = [];

    promises.push(youtubeservice.search(searchQuery));

    promises.push(bandcampservice.search(decodeURIComponent(searchQuery)));

    if(soundcloudservice.isLoggedIn()){
      promises.push(soundcloudservice.search(searchQuery));
    }

    if(await spotifyservice.isLoggedIn()){
      promises.push(spotifyservice.search(searchQuery));
    }

    Promise.all(promises).then(results => {
      return res.send(util.mergeResults(results));
    })
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send(process.env.ERR_500);
  }
});

module.exports = router;
