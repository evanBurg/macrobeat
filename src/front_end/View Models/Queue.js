class Queue {
  constructor(SongArray, CurrentlyPlayingIndex, Socket) {
    this._Queue = SongArray;
    this._ActiveIndex = CurrentlyPlayingIndex;
    this._Socket = Socket;
  }

  get LastSong() {
    if (this._Queue[this._ActiveIndex - 1])
      return this._Queue[this._ActiveIndex - 1];
    else return null;
  }

  get CurrentSong() {
    if (this._Queue[this._ActiveIndex]) return this._Queue[this._ActiveIndex];
    else return null;
  }

  get NextSong() {
    if (this._Queue[this._ActiveIndex + 1])
      return this._Queue[this._ActiveIndex + 1];
    else return null;
  }

  get Array() {
    return this._Queue;
  }

  get Empty() {
    return this._Queue.length === 0;
  }

  SkipTrack() {
    if (this._ActiveIndex + 1 <= this._Queue.length) {
      this._Socket.emit("nextTrack", this.NextSong().toJSON());
    }
  }

  LastTrack() {
    if (this._ActiveIndex - 1 >= 0) {
      this._Socket.emit("prevTrack", this.LastSong().toJSON());
    }
  }

  set SetTrack(index) {
    if (index >= 0 && index <= this._Queue.length) {
      this._Socket.emit("play", this._Queue[index].toJSON());
    }
  }

  PlayPause(){
    this._Socket.emit("playpause");
  }

  AddToQueue(Song){
    this._Socket.emit("queue", Song.toJSON());
  }

  PlayNext(Song){
    this._Socket.emit("playNext", Song.toJSON());
  }

  AddToLibrary(Song){
    this._Socket.emit("addToLibrary", Song.toJSON());
  }
}

export default Queue;
