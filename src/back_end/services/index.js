const spotifyservice = require(`./spotify-service`);
const youtubeservice = require(`./youtube-service`);

class Player {
  constructor() {}

  currentlyPlaying = null;
  currentService = "";
  state = "constructed";

  play(Song) {
    if (state === "playing" || state === "paused") {
      this.stop();
    }

    this.currentlyPlaying = Song;
    this.currentService = Song.Type;
    switch (Song.Type) {
      case "youtube":
        youtubeservice.play(Song);
        state = "playing";
        break;
      case "spotify":
        spotifyservice.play(Song);
        state = "playing";
        break;
    }
  }

  resume(){
	state === "playing"
	switch (this.currentService) {
		case "youtube":
		  return youtubeservice.resume();
		case "spotify":
		  return spotifyservice.resume();
	  }
  }

  scrub(timestamp){
	switch (this.currentService) {
		case "youtube":
		  return youtubeservice.scrub(timestamp);
		case "spotify":
		  return spotifyservice.scrub(timestamp);
	  }
	}

  pause() {
	state === "paused";
    switch (this.currentService) {
      case "youtube":
        return youtubeservice.pause();
      case "spotify":
        return spotifyservice.pause();
    }
  }

  stop(){
	state === "stopped";
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
