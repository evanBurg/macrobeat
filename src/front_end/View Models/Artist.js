class Artist{
    constructor(Name, Image, SongArray){
        this._Name = Name;
        this._Image = Image || "/img/music_placeholder.png"
        this._Albums = {};

        this._Songs = SongArray.filter(Song => Song.Artist == this._Name);
    }

    get Name(){
        return this._Name;
    }

    get Image(){
        return this._Image;
    }
    
    get Albums(){
        return this._Albums;
    }

    get Songs(){
        return this._Songs;
    }

    setImage(image){
        this._Image = image;
    }

    addSong = song => {
        this._Songs.push(song);
    } 

    addAlbum = Album => {
        this._Albums[Album.Name] = Album;
    }
}

export default Artist;