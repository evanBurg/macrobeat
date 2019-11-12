class Queue {
  constructor(SongArray, CurrentlyPlayingIndex, Socket) {
    this._Queue = SongArray;
    this._ActiveIndex = CurrentlyPlayingIndex;
    this._Socket = Socket;
  }

  JSONCopy = (object) => JSON.parse(JSON.stringify(object));

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
    if (this._ActiveIndex + 1 <= this._Queue.length && !!this.NextSong) {
      this._Socket.emit("nextTrack", this.JSONCopy(this.NextSong));
    }
  }

  LastTrack() {
    if (this._ActiveIndex - 1 >= 0 && !!this.LastSong) {
      this._Socket.emit("prevTrack", this.JSONCopy(this.LastSong));
    }
  }

  set SetTrack(index) {
    if (index >= 0 && index <= this._Queue.length) {
      this._Socket.emit("play", this.JSONCopy(this._Queue[index]));
    }
  }

  PlayPause(){
    this._Socket.emit("playpause");
  }

  AddToQueue(Song){
    this._Socket.emit("queue", this.JSONCopy(Song));
  }

  AddSongsToQueue(SongArray){
    this._Socket.emit("queueMultiple", SongArray.map(Song => this.JSONCopy(Song)));
  }

  PlayNext(Song){
    this._Socket.emit("playNext", this.JSONCopy(Song));
  }

  PlaySongsNext(SongArray){
    this._Socket.emit("playNextMultiple", SongArray.map(Song => this.JSONCopy(Song)));
  }

  AddToLibrary(Song){
    this._Socket.emit("addToLibrary", this.JSONCopy(Song));
  }
  RemoveFromLibrary(Song){
    this._Socket.emit("removeFromLibrary", this.JSONCopy(Song));
  }
}

export default Queue;
