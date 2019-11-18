const { spotifyservice } = require("../services");
const { Song } = require("../models");
const stringSimilarity = require("string-similarity");

const isUndefOrNull = obj => {
  return typeof obj === `undefined` || obj === null;
};

const isUndefOrNullOrWhiteSpace = str => {
  return typeof str === `undefined` || str === null || str.trim() === ``;
};

const generateRandomString = length => {
  const allowedChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let str = ``;
  for (let i = 0; i < length; i++) {
    str += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
  }
  return str;
};

const encodeSpaces = uri => {
  let str = ``;
  for (let i = 0; i < uri.length; i++) {
    str += uri.charAt(i) === ` ` ? `%20` : uri.charAt(i);
  }
  return str;
};

const unixTimestamp = () => (new Date().getTime() / 1000) | 0;

const addSongToLibrary = async song => {
  try {
    if (song.Type === "youtube") {
      //Attempt to get better album art
      if (await spotifyservice.isLoggedIn()) {
        let tracks = await spotifyservice.search(song.Name);
        if (tracks.length > 0) {
          let trackNames = tracks.map(i => i.track);
          let ratings = stringSimilarity.findBestMatch(song.Name, trackNames);
          if (
            tracks.length > ratings.bestMatchIndex &&
            ratings.bestMatchIndex > -1
          ) {
            song.Album = tracks[ratings.bestMatchIndex].album;
            song.Image = tracks[ratings.bestMatchIndex].image;
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  const artistImage = await spotifyservice.attemptFindArtistImage(song.Artist);
  //Add to users mongo library
  const newsong = new Song({
    id: song.ID,
    title: song.Name,
    artist: song.Artist,
    lengthS: song.Length,
    album: song.Album,
    image: song.Image,
    source: song.Type,
    artistImage: artistImage || undefined
  });

  return newsong;
};

module.exports = {
  isUndefOrNull,
  isUndefOrNullOrWhiteSpace,
  generateRandomString,
  encodeSpaces,
  unixTimestamp,
  addSongToLibrary
};
