//Type: YouTube
const YouTubeAdapter = song => ({
  ID: song.id,
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  Image: song.image || "https://placeimg.com/640/480/people",
  ArtistImage: "https://placeimg.com/640/480/people",
  Length: song.lengthS || 0,
  Type: "youtube"
});

const SpotifyAdapter = song => ({
  ID: song.id,
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  ArtistImage: "https://placeimg.com/640/480/people",
  Image: song.image || "https://placeimg.com/640/480/people",
  Length: song.lengthS || 0,
  Type: "spotify"
});

const DatabaseAdapter = song => ({
  ID: song.id || "Unknown",
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  Image: song.image || "https://placeimg.com/640/480/people",
  Length: song.lengthS || 0,
  ArtistImage: song.artistImage || "https://placeimg.com/640/480/people",
  Type: song.source || "Unknown"
});

class Song {
  constructor(SongJSON, Source) {
    this._valid = false;

    let song;
    switch (Source) {
      case "youtube":
        song = YouTubeAdapter(SongJSON);
        break;
      case "spotify":
        song = SpotifyAdapter(SongJSON);
        break;
      case "database":
        song = DatabaseAdapter(SongJSON);
        break;
    }

    if (song) {
      this._valid = true;
      this._ID = song.ID;
      this._Artist = song.Artist;
      this._Album = song.Album;
      this._Length = song.Length;
      this._Name = song.Name;
      this._Image = song.Image;
      this._ArtistImage = song.ArtistImage;
      this._Type = song.Type;
    }
  }

  get ID() {
    return this._ID;
  }

  get Artist() {
    return this._Artist;
  }

  get Album() {
    return this._Album;
  }

  get Name() {
    return this._Name;
  }

  get Length() {
    return this._Length;
  }

  get Image() {
    return this._Image;
  }

  get ArtistImage() {
    return this._ArtistImage;
  }

  get Type() {
    return this._Type;
  }

  toJSON() {
    return {
      ID: this._ID,
      Artist: this._Artist,
      Album: this._Album,
      Name: this._Name,
      Length: this._Length,
      Image: this._Image,
      Type: this._Type
    };
  }
}

export default Song;
