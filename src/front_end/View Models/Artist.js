class Artist{
    constructor(Name, SongArray){
        this._Name = Name;
        this._Image = "https://placeimg.com/640/480/people"
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

    addSong = song => {
        this._Songs.push(song);
    } 

    addAlbum = Album => {
        this._Albums[Album.Name] = Album;
    }
}

export default Artist;