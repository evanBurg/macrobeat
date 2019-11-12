//Type: YouTube
const YouTubeAdapter = song => ({
  ID: song.id,
  Artist: song.artist,
  Album: "Unknown",

  Name: song.track,
  Image: song.thumbnail || "https://placeimg.com/640/480/people",
  Type: "youtube"
});

const SpotifyAdapter = song => ({
  ID: song.id,
  Artist: song.artist,
  Album: "Unknown",

  Name: song.track,
  Image: song.image || "https://placeimg.com/640/480/people",
  Type: "spotify"
});

const DatabaseAdapter = song => ({
  ID: song.uniqueId,
  Artist: song.artist,
  Album: "Unknown",

  Name: song.title,
  Image: song.image || "https://placeimg.com/640/480/people",
  Type: song.source
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
      case "database":
        song = DatabaseAdapter(SongJSON);
        break;
    }

    if(song){
        this._valid = true;

        this._ID = song.ID;
        this._Artist = song.Artist;
        this._Album = song.Album;

        this._Name = song.Name;
        this._Image = song.Image;
        this._Type = song.Type;
    }
  }

  get ID(){
      return this._ID;
  }

  get Artist(){
      return this._Artist;
  }

  get Album(){
      return this._Album;
  }

  get Name(){
      return this._Name;
  }

  get Image(){
      return this._Image;
  }

  get Type(){
      return this._Type;
  }

  toJSON(){
    return {
      ID: this._ID,
      Artist: this._Artist,
      Album: this._Album,
      Name: this._Name,
      Image: this._Image,
      Type: this._Type,
    }
  }
}

export default Song;