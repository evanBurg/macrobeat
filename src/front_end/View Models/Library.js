import Song from "./Song";
import Album from "./Album";
import Artist from "./Artist";

class Library {
  constructor(Results, History) {
    this._Artists = {};
    this._Albums = {};
    this._History = History;
    this._Songs = Results.items.map(song => new Song(song, Results.source));

    this._Songs.forEach(song => {
      let artistExists = false;
      if (song.Artist && Object.keys(this._Artists).includes(song.Artist)) {
        artistExists = true;
        this._Artists[song.Artist].addSong(song);
      } else {
        artistExists = true;
        this._Artists[song.Artist] = new Artist(song.Artist, [song]);
      }

      let albumExists = false;
      if (song.Album && Object.keys(this._Albums).includes(song.Album)) {
        albumExists = true;
        this._Albums[song.Album].addSong(song);
      } else {
        albumExists = true;
        this._Albums[song.Album] = new Album(song.Album, song.Artist, [song]);
      }

      if (artistExists && albumExists) {
        this._Artists[song.Artist].addAlbum(this._Albums[song.Album]);
      }
    });
  }

  get Artists() {
    return this._Artists;
  }

  get Albums() {
    return this._Albums;
  }

  get History() {
    return this._History;
  }

  get Songs() {
    return this._Songs;
  }
}

export default Library;
