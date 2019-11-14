require(`dotenv`).config();
const express = require(`express`);
const router = express.Router();
const querystring = require(`querystring`);
const request = require(`request`);

const { util } = require(`../utilities`);
const { AuthToken } = require(`../models`);

// Spotify Auth Notes
// ==================
// https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js
// if res is error 429 then you have made too many calls to the api

// this is where spotify sends the user after a login attempt (success or failure)
router.get(`/redirect`, async (req, res) => {
  try {
    // request refresh and access tokens after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies
      ? req.cookies[process.env.SPOTIFY_STATE_KEY]
      : null;
    if (state === null || state !== storedState) {
      return res.status(500).send(`Authentication failed. Please try again.`);
    }
    res.clearCookie(process.env.SPOTIFY_STATE_KEY);
    const authOptions = {
      url: process.env.SPOTIFY_TOKEN_URI,
      form: {
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        grant_type: `authorization_code`
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString(`base64`)}`
      },
      json: true
    };
    request.post(authOptions, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.send(`Authentication failed. Please try again.`);
      }
      const accessToken = body.access_token;
      const refreshToken = body.refresh_token;
      const options = {
        url: process.env.SPOTIFY_ME_URI,
        headers: { Authorization: `Bearer ${accessToken}` },
        json: true
      };
      // use the access token to access the Spotify Web API
      request.get(options, (error, response, body) => {
        // ensure user account has accesss to premium and then store the credentials
        if (body.product !== `premium`) {
          return res.send(
            `This account does not have access to Spotify Premium.`
          );
        }
        const doc = {
          serviceName: `spotify`,
          authToken: accessToken,
          refreshToken
        };
        AuthToken.findOneAndUpdate(
          { serviceName: `spotify` },
          doc,
          { upsert: true },
          (err, doc) => {
            if (err) {
              return res
                .status(500)
                .send(`Spotify auth token could not be saved.`);
            }
            return res.send(`Spotify auth token successfully saved.`);
          }
        );
      });
    });
  } catch (e) {
    console.log(e.stack);
    return res.status(500).send(process.env.ERR_500);
  }
});

// redirect user to spotify log in, will be redirected back to our /redirect uri upon success or failure
router.get(`/login`, async (req, res) => {
  try {
    // generate state key and keep track of user with cookie
    const stateKey = util.generateRandomString(16);
    res.cookie(process.env.SPOTIFY_STATE_KEY, stateKey);
    // redirect user to spotify login, user will be redirected to our redirect uri
    return res.redirect(
      process.env.SPOTIFY_AUTH_URI +
        querystring.stringify({
          response_type: `code`,
          client_id: process.env.SPOTIFY_CLIENT_ID,
          scope: process.env.SPOTIFY_SCOPE,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
          state: stateKey
        })
    );
  } catch (e) {
    console.log(e.stack);
    return res.status(500).send(process.env.ERR_500);
  }
});

module.exports = router;
