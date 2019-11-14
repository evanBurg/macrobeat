class Album{
    constructor(Name, Artist, Image, SongArray){
        this._Name = Name;
        this._Image = Image || "https://placeimg.com/640/480/people"
        this._Artist = Artist;

        this._Songs = SongArray.filter(Song => Song.Album == this._Name);
    }

    get Name(){
        return this._Name;
    }

    get Image(){
        return this._Image;
    }

    get Artist(){
        return this._Artist;
    }

    get Songs(){
        return this._Songs;
    }

    addSong = song => {
        this._Songs.push(song);
    } 
}

export default Album;