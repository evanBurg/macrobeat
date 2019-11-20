//Type: YouTube
const YouTubeAdapter = song => ({
  ID: song.id,
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  Image: song.image || "/img/music_placeholder.png",
  ArtistImage: "/img/music_placeholder.png",
  Length: song.lengthS || 0,
  Type: "youtube"
});

const SpotifyAdapter = song => ({
  ID: song.id,
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  ArtistImage: "/img/music_placeholder.png",
  Image: song.image || "/img/music_placeholder.png",
  Length: song.lengthS || 0,
  Type: "spotify"
});

const BandcampAdapter = song => ({
  ID: song.id || "Unknown",
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  Image: song.image || "/img/music_placeholder.png",
  Length: song.lengthS || 0,
  ArtistImage: song.artistImage || "/img/music_placeholder.png",
  Type: song.source || "Unknown"
});

const SoundcloudAdapter = song => ({
  ID: song.id || "Unknown",
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  Image: song.image || "/img/music_placeholder.png",
  Length: song.lengthS || 0,
  ArtistImage: song.artistImage || "/img/music_placeholder.png",
  Type: song.source || "Unknown"
});

const DatabaseAdapter = song => ({
  ID: song.id || "Unknown",
  Artist: song.artist || "Unknown",
  Album: song.album || "Unknown",
  Name: song.title || "Unknown",
  Image: song.image || "/img/music_placeholder.png",
  Length: song.lengthS || 0,
  ArtistImage: song.artistImage || "/img/music_placeholder.png",
  Type: song.source || "Unknown"
});

const CustomSongAdapter = url => ({
  ID: url,
  Artist: "Unknown",
  Album: "Unknown",
  Name: url,
  Image: "/img/music_placeholder.png",
  Length: 0,
  ArtistImage: "/img/music_placeholder.png",
  Type: "mpv"
})

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
      case "bandcamp":
        song = BandcampAdapter(SongJSON);
        break;
      case "soundcloud":
        song = SoundcloudAdapter(SongJSON);
        break;
      case "database":
        song = DatabaseAdapter(SongJSON);
        break;
      case "custom":
        song = CustomSongAdapter(SongJSON)
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
