require(`dotenv`).config();
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const express = require(`express`);
const app = express();
const http = require(`http`);
const socketIO = require(`socket.io`);
const cors = require(`cors`);
const port = process.env.PORT || 5000;
const stringSimilarity = require("string-similarity");
const {
  searchroutes,
  spotifyroutes,
  userroutes,
  youtuberoutes
} = require(`./src/back_end/routes`);
const { Song, User } = require(`./src/back_end/models`);
const { Player: plr, spotifyservice } = require(`./src/back_end/services`);

app.use(cors()); // TODO remove in production, just for testing with postman

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(`/api/search`, searchroutes);
app.use(`/api/spotify`, spotifyroutes);
app.use(`/api/user`, userroutes);
app.use(`/api/youtube`, youtuberoutes);

app.use(express.static(`public`));

app.get(`/`, (req, res) => {
  res.sendFile(`index.html`);
});

const server = http.createServer(app);
const io = socketIO(server);

let users = [];

const updateClients = err => {
  if (err) {
    io.emit(err);
  }

  io.emit(`update`, {
    queue: Player.queue,
    currentSong: Player.currentSong,
    playing: Player.state === "playing",
    users,
    timestamp: Player.timestamp,
    duration: Player.duration,
    repeat: Player.repeatState,
    volume: Player.volumeLevel
  });
};

const getLibrary = () => {
  return new Promise((res, rej) => {
    Song.find({}, (err, songs) => {
      if (!err) res(songs);
      else rej(err);
    });
  });
};

attemptCreateUser = data => {
  return new Promise(async (res, rej) => {
    let user = await User.findOne({ uniqueId: data.id });

    if (!user) {
      await User.create({
        uniqueId: data.id
      });
      user = await User.findOne({ uniqueId: data.id });
    }
    res(user);
  });
};

const addSongToLibrary = async song => {
  try {
    if (song.Type === "youtube") {
      //Attempt to get better album art
      if (await spotifyservice.isLoggedIn()) {
        let tracks = await spotifyservice.search(song.Name);
        if (tracks.length > 0) {
          let trackNames = tracks.map(i => i.track);
          let ratings = stringSimilarity.findBestMatch(song.Name, trackNames);
          if (
            tracks.length > ratings.bestMatchIndex &&
            ratings.bestMatchIndex > -1
          ) {
            song.Album = tracks[ratings.bestMatchIndex].album;
            song.Image = tracks[ratings.bestMatchIndex].image;
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  let artistImage = undefined;
  try {
    artistImage = await spotifyservice.attemptFindArtistImage(song.Artist);
  } catch (e) {
    console.log(e);
  }
  //Add to users mongo library
  const newsong = new Song({
    id: song.ID,
    title: song.Name,
    artist: song.Artist,
    lengthS: song.Length,
    album: song.Album,
    image: song.Image,
    source: song.Type,
    artistImage: artistImage || undefined
  });

  return newsong;
};

const Player = new plr(updateClients);

io.on("connection", async socket => {
  updateClients();
  socket.on("init", async data => {
    socket.userId = data.id;
    let user = await attemptCreateUser({ id: data.id });

    if (
      user &&
      !!user.userName &&
      !!user.profilePicBase64 &&
      user.userName !== " " &&
      user.profilePicBase64 != +" "
    ) {
      users = users.filter(usr => usr.id !== data.id && !!usr.id);
      let User = {
        user: user.username,
        img: user.profilePicBase64,
        id: data.id
      };
      socket.username = User.user;
      users.push(User);
      socket.emit("init", {
        User,
        loggedIn: true,
        library: await getLibrary(),
        spotify: await spotifyservice.isLoggedIn()
      });
    } else {
      //Notify the front end that the user needs to identify themselves
      socket.emit("init", {
        User: null,
        loggedIn: false
      });
    }
    updateClients();
  });

  socket.on("kickuser", ({ userKicked, Kicker }) => {
    //if(Kicker is admin)
    io.emit("kicked", { userKicked, Kicker });
  });

  socket.on("reorder", newQueue => Player.reorder(newQueue));

  socket.on("identify", async data => {
    if (data.username && data.icon) {
      users = users.filter(usr => usr.id !== socket.userId && usr.id);
      const userData = {
        user: data.username,
        img: data.icon,
        id: data.id
      };
      users.push(userData);
      await User.updateOne(
        { uniqueId: userData.id },
        { userName: userData.user, profilePicBase64: userData.img }
      );
      //Also save in the database
      socket.username = data.username;
      socket.emit("init", {
        User: userData,
        loggedIn: true,
        library: await getLibrary(),
        spotify: await spotifyservice.isLoggedIn()
      });
    }

    updateClients();
  });

  socket.on("removeFromQueue", song => Player.removeSongFromQueue(song));

  socket.on("shuffle", () => Player.shuffle());

  socket.on("repeat", () => Player.repeat());

  socket.on("queue", song => Player.addSongToQueue(song));

  socket.on("queueMultiple", songArray =>
    Player.addMultipleSongsToQueue(songArray)
  );

  socket.on("playNextMultiple", songArray =>
    Player.playMultipleSongsNext(songArray)
  );

  socket.on("playNext", song => Player.playSongNext(song));

  socket.on("play", song => Player.play(song));

  socket.on("volume", volume => Player.volume(volume));

  socket.on("playpause", song => {
    if (Player.state === "playing") {
      Player.pause();
    } else if (Player.state === "paused") {
      Player.resume();
    } else if (Player.state === "constructed") {
      Player.play();
    }
    updateClients();
  });

  socket.on("prevTrack", song => Player.prevTrack());

  socket.on("nextTrack", data => Player.nextTrack());

  socket.on("scrub", data => {
    if (data.timestamp) {
      Player.scrub(data.timestamp);
    } else {
      socket.emit("scrubError");
    }
    updateClients();
  });

  socket.on("addToLibrary", async song => {
    if (song.Type && song.ID) {
      let newSong = await addSongToLibrary(song);
      newSong.save(async err => {
        if (err) {
          console.log(err);
          socket.emit("addToLibraryError");
        } else {
          io.emit("reloadLibrary", await getLibrary());
        }
      });
    } else {
      socket.emit("addToLibraryError");
    }
    updateClients();
  });

  socket.on("removeFromLibrary", song => {
    if (song.Type && song.ID) {
      //Add to users mongo library
      Song.deleteOne({ id: song.ID, source: song.Type }, async err => {
        if (err) {
          console.log(err);
          socket.emit("removeFromLibraryError");
        } else {
          io.emit("reloadLibrary", await getLibrary());
        }
      });
    } else {
      socket.emit("removeFromLibraryError");
    }
    updateClients();
  });

  socket.on("removeArtistFromLibrary", songArray => {
    let ids = songArray.map(song => song.ID);

    if (ids.length > 0) {
      //Add to users mongo library
      Song.deleteMany({ id: { $in: ids } }, async err => {
        if (err) {
          console.log(err);
          socket.emit("removeFromLibraryError");
        } else {
          io.emit("reloadLibrary", await getLibrary());
        }
      });
    } else {
      socket.emit("removeFromLibraryError");
    }
    updateClients();
  });

  socket.on("removeAlbumFromLibrary", songArray => {
    let ids = songArray.map(song => song.ID);

    if (ids.length > 0) {
      //Add to users mongo library
      Song.deleteMany({ id: { $in: ids } }, async err => {
        if (err) {
          console.log(err);
          socket.emit("removeFromLibraryError");
        } else {
          io.emit("reloadLibrary", await getLibrary());
        }
      });
    } else {
      socket.emit("removeFromLibraryError");
    }
    updateClients();
  });

  socket.on("setArtistImage", async ({ name, image }) => {
    await Song.updateMany({ artist: name }, { artistImage: image }).exec();
    io.emit("reloadLibrary", await getLibrary());
  });

  socket.on("setAlbumImage", async ({ name, image }) => {
    await Song.updateMany({ album: name }, { image: image }).exec();
    io.emit("reloadLibrary", await getLibrary());
  });

  socket.on("disconnect", function() {
    users = users.filter(usr => usr.id !== socket.userId && usr.id);
  });

  socket.on("getupdate", () => updateClients());
});

const mongoose = require(`mongoose`);
mongoose.set(`useNewUrlParser`, true);
mongoose.set(`useFindAndModify`, false);
mongoose.set(`useCreateIndex`, true);
mongoose.set(`useUnifiedTopology`, true);
mongoose.connect(`${process.env.DBURL}/${process.env.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;

db.on(`error`, console.error.bind(console, `connection error: `));

db.once(`open`, () => {
  console.log(`connected to MongoDB`);
  server.listen(port, () => {
    console.log(`listening on port ${port} - ${process.env.NODE_ENV}`);
  });
});
