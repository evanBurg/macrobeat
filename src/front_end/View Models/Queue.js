class Queue {
  constructor(SongArray, CurrentlyPlayingIndex) {
    this._Queue = SongArray;
    this._ActiveIndex = CurrentlyPlayingIndex;
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
      console.log("Skip Forward")
    }
  }

  LastTrack() {
    if (this._ActiveIndex - 1 >= 0) {
      console.log("Skip Backward")
    }
  }

  set SetTrack(index){
    if (index >= 0 && index <= this._Queue.length) {
      console.log("Set Track ", index);
      }
  }
}

export default Queue;
