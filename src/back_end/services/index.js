const spotifyservice = require(`./spotify-service`);
const youtubeservice = require(`./youtube-service`);

class Player {
  constructor() {
    this.currentlyPlaying = null;
    this.currentService = "";
    this.state = "constructed";
  }

  play(Song) {
    if (this.state === "playing" || this.state === "paused") {
      this.stop();
    }

    if(!Song){
      return;
    }

    this.currentlyPlaying = Song;
    this.currentService = Song.Type;
    switch (Song.Type) {
      case "youtube":
        youtubeservice.play(Song.ID);
        this.state = "playing";
        break;
      case "spotify":
        spotifyservice.play(Song.ID);
        this.state = "playing";
        break;
    }
  }

  resume() {
    this.state = "playing";
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.resume();
      case "spotify":
        return spotifyservice.resume();
    }
  }

  scrub(timestamp) {
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.scrub(timestamp);
      case "spotify":
        return spotifyservice.scrub(timestamp);
    }
  }

  pause() {
    this.state = "paused";
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.pause();
      case "spotify":
        return spotifyservice.pause();
    }
  }

  stop() {
    this.state = "stopped";
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.stop();
      case "spotify":
        return spotifyservice.stop();
    }
    this.currentlyPlaying = null;
    this.currentService = "";
  }
}

module.exports = {
  spotifyservice,
  youtubeservice,
  Player
};
