const spotifyservice = require(`./spotify-service`);
const youtubeservice = require(`./youtube-service`);
const bandcampservice = require("./bandcamp-service");
const soundcloudservice = require("./soundcloud-service");
const {util} = require('../utilities');
const unixTimestamp = util.unixTimestamp;
const MPV = require("node-mpv");
const MPV_LOCATION = process.env.MPV_LOCATION;

class Player {
  constructor(notifyCallback) {
    this.notify = notifyCallback;
    this.queue = [];

    this.currentSong = 0;
    this.currentlyPlaying = null;
    this.currentService = "";
    this.timestamp = 0;
    this.duration = 0;

    this.state = "constructed";
    this.mpv = new MPV({
      audio_only: true,
      binary: MPV_LOCATION
    });

    this.callbacksSet = false;

    this.services = {
      youtube: new youtubeservice.YouTubePlayer(this.mpv),
      soundcloud: new soundcloudservice.SoundCloudPlayer(this.mpv),
      bandcamp: new bandcampservice.BandcampPlayer(this.mpv)
    };
  }

  reorder(newQueue) {
    let { ID, Time } = this.queue[this.currentSong];
    this.queue = newQueue;
    newQueue.forEach((song, idx) => {
      if (song.ID === ID && song.Time === Time) {
        currentSong = idx;
      }
    });
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
      song.Time = unixTimestamp();
      this.queue.push(song);
    } else {
      this.notify("queueError");
    }
    this.notify();
  }

  addMultipleSongsToQueue(songArray) {
    if (songArray) {
      this.queue = [
        ...this.queue,
        ...songArray.map((song, idx) => ({
          ...song,
          Time: unixTimestamp() + idx
        }))
      ];
    } else {
      this.notify("queueError");
    }
    this.notify();
  }

  playSongNext(song) {
    if (song.Type && song.ID) {
      song.Time = unixTimestamp();
      this.queue.splice(this.currentSong + 1, 0, song);
    } else {
      this.notify("playNextError");
    }
    this.notify();
  }

  playMultipleSongsNext(songArray) {
    if (songArray) {
      this.queue.splice(
        this.currentSong + 1,
        0,
        ...songArray.map((song, idx) => ({
          ...song,
          Time: unixTimestamp() + idx
        }))
      );
    } else {
      this.notify("playNextError");
    }
    this.notify();
  }

  play() {
    if (!this.callbacksSet) {
      this.mpv.on("timeposition", (e) => this.updateTimestamp(e, this));
      this.mpv.on("stopped", (e) => this.onFinished(this));
      this.mpv.on("statuschange", (e) => this.onStatusChange(e, this));
    }

    let Song = this.queue[this.currentSong];
    if (this.state === "playing" || this.state === "paused") {
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
      case "spotify":
        //Just skip this until we can play
        setTimeout(this.onFinished, 400);
        break;
      default:
        this.services[Song.Type].play(Song);
        break;
    }
  }

  prevTrack() {
    this.currentSong -= 1;
    this.play(this.queue[this.currentSong]);
    this.notify();
  }

  nextTrack() {
    this.currentSong += 1;
    this.play(this.queue[this.currentSong]);
    this.notify();
  }

  updateTimestamp(seconds, objectInstance) {
    this.state = "playing";
    objectInstance.timestamp = seconds;
    objectInstance.notify();
  }

  onStatusChange(status, objectInstance) {
    objectInstance.status = status;
    if(status.duration){
      objectInstance.duration = status.duration;
      objectInstance.notify();
    }
  }

  onFinished(objectInstance) {
    if (objectInstance.currentSong + 1 < objectInstance.queue.length) {
      objectInstance.currentSong += 1;
      objectInstance.play(objectInstance.queue[objectInstance.currentSong]);
    }
    objectInstance.state = "finished";
  }

  resume() {
    this.state = "playing";
    switch (this.currentService) {
      case "spotify":
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
      default:
        this.services[this.currentService].scrub(timestamp);
        break;
    }
  }

  pause() {
    this.state = "paused";
    switch (this.currentService) {
      case "spotify":
        break;
      default:
        this.services[this.currentService].pause();
        break;
    }
  }

  stop() {
    this.state = "stopped";
    switch (this.currentService) {
      case "spotify":
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
