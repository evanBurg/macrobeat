const spotifyservice = require(`./spotify-service`);
const youtubeservice = require(`./youtube-service`);
const bandcampservice = require("./bandcamp-service");
const soundcloudservice = require("./soundcloud-service");

class Player {
  constructor() {
    this.currentlyPlaying = null;
    this.currentService = "";
    this.timestamp = 0;
    this.state = "constructed";
  }

  play(Song) {
    if (this.state === "playing" || this.state === "paused") {
      this.stop();
    }

    if (!Song) {
      return;
    }

    this.currentlyPlaying = Song;
    this.currentService = Song.Type;
    switch (Song.Type) {
      case "youtube":
        youtubeservice.play(Song.ID, this.updateTimestamp);
        this.state = "playing";
        break;
      case "bandcamp":
        bandcampservice.play(Song.ID, this.updateTimestamp);
        this.state = "playing";
        break;
      case "soundcloud":
        soundcloudservice.play(Song.ID, this.updateTimestamp);
        this.state = "playing";
        break;
      case "spotify":
        //spotifyservice.play(Song.ID);
        this.state = "playing";
        break;
    }
  }

  updateTimestamp(seconds) {
    this.timestamp = seconds;
  }

  resume() {
    this.state = "playing";
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.resume();
      case "bandcamp":
        return bandcampservice.resume();
      case "spotify":
      //return spotifyservice.resume();
    }
  }

  scrub(timestamp) {
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.scrub(timestamp);
      case "bandcamp":
        return bandcampservice.scrub(timestamp);
      case "soundcloud":
        return bandcampservice.scrub(timestamp);
      case "spotify":
      //return spotifyservice.scrub(timestamp);
    }
  }

  pause() {
    this.state = "paused";
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.pause();
      case "bandcamp":
        return bandcampservice.pause();
      case "soundcloud":
        return bandcampservice.pause();
      case "spotify":
      //return spotifyservice.pause();
    }
  }

  stop() {
    this.state = "stopped";
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.stop();
      case "bandcamp":
        return bandcampservice.stop();
      case "soundcloud":
        return bandcampservice.stop();
      case "spotify":
      //return spotifyservice.stop();
    }
    this.currentlyPlaying = null;
    this.currentService = "";
  }
}

module.exports = {
  spotifyservice,
  youtubeservice,
  bandcampservice,
  soundcloudservice,
  Player
};
