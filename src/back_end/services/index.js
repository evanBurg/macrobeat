const spotifyservice = require(`./spotify-service`);
const youtubeservice = require(`./youtube-service`);
const bandcampservice = require("./bandcamp-service");
const soundcloudservice = require("./soundcloud-service");
const { util } = require("../utilities");
const { AuthToken } = require("../models/");
const unixTimestamp = util.unixTimestamp;
const cuid = require("cuid");
const MPV = require("node-mpv");
const MPV_LOCATION = process.env.MPV_LOCATION;

class Player {
  constructor(notifyCallback) {
    this.notify = notifyCallback;
    this.queue = [];

    this.empty = true;
    this.repeatState = false;

    this.currentSong = 0;
    this.currentlyPlaying = null;
    this.currentService = "";
    this.timestamp = 0;
    this.duration = 0;
    this.volumeLevel = 100;

    this.state = "constructed";
    this.mpv = new MPV({
      audio_only: true,
      binary: MPV_LOCATION
    });
    this.mpv.volume(this.volumeLevel);

    this.callbacksSet = false;

    this.services = {
      youtube: new youtubeservice.YouTubePlayer(this.mpv),
      soundcloud: new soundcloudservice.SoundCloudPlayer(this.mpv),
      bandcamp: new bandcampservice.BandcampPlayer(this.mpv)
    };

    this.checkForSpotify();
  }

  async checkForSpotify() {
    if (await spotifyservice.isLoggedIn()) {
      this.spotifyToken = await AuthToken.findOne({
        serviceName: `spotify`
      }).exec();
      this.services[
        "spotify"
      ] = new spotifyservice.SpotifyPlayer(this.spotifyToken, e =>
        this.onSpotifyStatusChange(this, e)
      );
    }
  }

  onSpotifyStatusChange(objectInstance, status) {
    objectInstance.status = status;
    if (status.duration) {
      objectInstance.duration = status.duration;
    }

    if (status.position) {
      objectInstance.timestamp = status.position;
    }

    objectInstance.notify();
  }

  volume(level) {
    this.volumeLevel = level;
    switch (this.currentService) {
      case "spotify":
        this.services.spotify.setVolume(level);
        break;
      default:
        this.mpv.volume(this.volumeLevel);
        break;
    }
    this.notify();
  }

  reorder(newQueue) {
    let { ID, Time } = this.queue[this.currentSong];
    this.queue = newQueue;
    const playerThis = this;
    newQueue.forEach((song, idx) => {
      if (song.ID === ID && song.Time === Time) {
        playerThis.currentSong = idx;
      }
    });
    this.notify();
  }

  shuffle() {
    let curSong = this.queue[this.currentSong];
    this.queue = this.queue.filter(
      song => song.ID !== curSong.ID && song.Time !== curSong.Time
    );
    this.queue = util.shuffleArray(this.queue);
    this.queue = [curSong, ...this.queue];
    this.currentSong = 0;
    this.notify();
  }

  repeat() {
    switch (this.repeatState) {
      case false:
        this.repeatState = "queue";
        break;
      case "queue":
        this.repeatState = "song";
        break;
      case "song":
        this.repeatState = false;
        break;
    }
    this.notify();
  }

  removeSongFromQueue(song) {
    if (song.Type && song.ID && song.Time) {
      this.queue = this.queue.filter(sng => {
        return sng.ID !== song.ID && sng.Time !== song.Time;
      });
    } else {
      this.notify("queueError");
    }
    this.notify();
  }

  addSongToQueue(song) {
    if (song.Type && song.ID) {
      song.Time = `${unixTimestamp()}-${cuid()}`;
      this.queue.push(song);
    } else {
      this.notify("queueError");
    }
    this.notify();

    if (this.empty) {
      this.empty = false;
      this.play();
    }
  }

  addMultipleSongsToQueue(songArray) {
    if (songArray) {
      this.queue = [
        ...this.queue,
        ...songArray.map((song, idx) => ({
          ...song,
          Time: `${unixTimestamp()}-${cuid()}-${idx}`
        }))
      ];
    } else {
      this.notify("queueError");
    }
    this.notify();

    if (this.empty) {
      this.empty = false;
      this.play();
    }
  }

  playSongNext(song) {
    if (song.Type && song.ID) {
      song.Time = `${unixTimestamp()}-${cuid()}`;
      this.queue.splice(this.currentSong + 1, 0, song);
    } else {
      this.notify("playNextError");
    }
    this.notify();

    if (this.empty) {
      this.empty = false;
      this.play();
    }
  }

  playMultipleSongsNext(songArray) {
    if (songArray) {
      this.queue.splice(
        this.currentSong + 1,
        0,
        ...songArray.map((song, idx) => ({
          ...song,
          Time: `${unixTimestamp()}-${cuid()}-${idx}`
        }))
      );
    } else {
      this.notify("playNextError");
    }
    this.notify();

    if (this.empty) {
      this.empty = false;
      this.play();
    }
  }

  play() {
    if (!this.callbacksSet) {
      this.mpv.on("timeposition", e => this.updateTimestamp(e, this));
      this.mpv.on("stopped", e => this.onFinished(this));
      this.mpv.on("statuschange", e => this.onStatusChange(e, this));
      this.callbacksSet = true;
    }

    let Song = this.queue[this.currentSong];
    if (this.state === "playing" || this.state === "paused" || this.state === "skipping") {
      this.stop();
      this.duration = 0;
      this.timestamp = 0;
    }

    if (!Song) {
      return;
    }

    this.currentlyPlaying = Song;
    this.currentService = Song.Type;
    this.state = "playing";
    switch (Song.Type) {
      case "mpv":
        this.mpv.load(Song.ID, "replace");
        break;
      default:
        this.services[Song.Type].play(Song);
        break;
    }
  }

  prevTrack() {
    if (this.currentSong - 1 > -1) {
      this.state = "skipping";
      this.currentSong -= 1;
      this.duration = 0;
      this.timestamp = 0;
      this.notify();
      this.play();
    }
  }

  nextTrack() {
    if (this.currentSong + 1 < this.queue.length) {
      this.state = "skipping";
      this.currentSong += 1;
      this.duration = 0;
      this.timestamp = 0;
      this.notify();
      this.play();
    }
  }

  updateTimestamp(seconds, objectInstance) {
    objectInstance.state = "playing";
    objectInstance.timestamp = seconds;
    objectInstance.notify();
  }

  onStatusChange(status, objectInstance) {
    objectInstance.status = status;
    if (status.duration) {
      objectInstance.duration = status.duration;
      objectInstance.notify();
    }
  }

  onFinished(objectInstance) {
    objectInstance.state = "finished";

    switch (objectInstance.repeatState) {
      case false:
        break;
      case "queue":
        if (
          objectInstance.state !== "skipping" &&
          !(objectInstance.currentSong + 1 < objectInstance.queue.length)
        ) {
          objectInstance.state = "skipping";
          objectInstance.currentSong = 0;
          objectInstance.duration = 0;
          objectInstance.timestamp = 0;
          objectInstance.notify();
          objectInstance.play();
          return;
        }
        break;
      case "song":
        objectInstance.state = "skipping";
        objectInstance.duration = 0;
        objectInstance.timestamp = 0;
        objectInstance.notify();
        objectInstance.play();
        return;
    }

    if (objectInstance.state !== "skipping") {
      if (objectInstance.currentSong + 1 < objectInstance.queue.length) {
        objectInstance.currentSong += 1;
        objectInstance.duration = 0;
        objectInstance.timestamp = 0;
        objectInstance.notify();
        objectInstance.play();
      } else {
        //Queue ended
        objectInstance.state = "finished";
        objectInstance.notify();
      }
    }
  }

  resume() {
    this.state = "playing";
    switch (this.currentService) {
      case "mpv":
        this.mpv.resume();
        break;
      default:
        this.services[this.currentService].resume();
        break;
    }
  }

  scrub(timestamp) {
    switch (this.currentService) {
      case "spotify":
        break;
      case "mpv":
        this.mpv.scrub();
        break;
      default:
        this.services[this.currentService].scrub(timestamp);
        break;
    }
  }

  pause() {
    this.state = "paused";
    switch (this.currentService) {
      case "mpv":
        this.mpv.pause();
        break;
      default:
        this.services[this.currentService].pause();
        break;
    }
  }

  stop() {
    this.state = "stopped";
    switch (this.currentService) {
      case "mpv":
        this.mpv.stop();
        break;
      default:
        this.services[this.currentService].stop();
        break;
    }
    this.currentlyPlaying = null;
    this.currentService = "";
  }
}

module.exports = {
  youtubeservice,
  soundcloudservice,
  bandcampservice,
  spotifyservice,
  Player
};
