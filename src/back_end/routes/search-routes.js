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
    let promises = [];

    if(await spotifyservice.isLoggedIn()){
      promises.push(spotifyservice.search(searchQuery));
    }

    if(soundcloudservice.isLoggedIn()){
      promises.push(soundcloudservice.search(searchQuery));
    }

    promises.push(youtubeservice.search(searchQuery));

    promises.push(bandcampservice.search(decodeURIComponent(searchQuery)));

    Promise.all(promises).then(results => {
      results = results.reduce((acc, items) => [...acc, ...items], []);
      return res.send(shuffle(results));
    })
  } catch (err) {
    console.log(err.stack);
    return res.status(500).send(process.env.ERR_500);
  }
});

module.exports = router;
