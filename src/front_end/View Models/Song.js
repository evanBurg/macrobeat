//Type: YouTube
const YouTubeAdapter = song => ({
  ID: song.id.videoId,
  Artist: song.snippet.channelTitle,
  Album: "Unknown",

  Name: song.snippet.title,
  Image: song.snippet.thumbnails.high,
  Type: "YouTube"
});

class Song {
  constructor(SongJSON, Source) {
    this._valid = false;

    let song;
    switch (Source) {
      case "YouTube":
        song = YouTubeAdapter(SongJSON);
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
}

export default Song;