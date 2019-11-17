require(`dotenv`).config();
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const express = require(`express`);
const app = express();
const http = require(`http`);
const socketIO = require(`socket.io`);
var stringSimilarity = require("string-similarity");
const cors = require(`cors`);
const port = process.env.PORT || 5000;
const {
  searchroutes,
  spotifyroutes,
  userroutes,
  youtuberoutes
} = require(`./src/back_end/routes`);
const { Song, User } = require(`./src/back_end/models`);

const { Player: plr, spotifyservice } = require(`./src/back_end/services`);
const Player = new plr();

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
let queue = [];
let currentSong = 0;

const updateClients = () => {
  io.emit(`update`, {
    queue,
    currentSong,
    playing: Player.state === "playing",
    users
  });
};

const unixTimestamp = () => (new Date().getTime() / 1000) | 0;

const getLibrary = () => {
  return new Promise((res, rej) => {
    Song.find({}, (err, songs) => {
      if (!err) res(songs);
      else rej(err);
    });
  });
};

const bannedUsers = process.env.BANNED_USERS
  ? process.env.BANNED_USERS.split(",")
  : [];

attemptCreateUser = data => {
  return new Promise(async (res, rej) => {
    let user = await User.findOne({ uniqueId: data.id });

    if (!user) {
      await User.create({
        uniqueId: data.id,
        userName: data.user || " ",
        profilePicBase64: data.img || " "
      });
      user = await User.findOne({ uniqueId: data.id });
    }
    res(user);
  });
};

playSong = (song) => {
  if (song.Type && song.ID) {
    //TODO: Call python to play the song
    Player.play(song, () => {
      currentSong += 1;
      playSong(queue[currentSong]);
    });
  } else {
    socket.emit("playError");
  }
  updateClients();
}

io.on("connection", async socket => {
  updateClients();

  //On initial connection, check if the user already has their login stored
  socket.on("init", async data => {
    socket.userId = data.id;
    if (bannedUsers.includes(data.id)) {
      io.emit("kicked", { userKicked: data.id, Kicker: data.id });
    }

    //Create an empty row with only the ID
    let user = await attemptCreateUser({ id: data.id });

    if (
      user &&
      !!user.userName &&
      !!user.profilePicBase64 &&
      user.userName !== " " &&
      user.profilePicBase64 != +" "
    ) {
      //check databse for user data
      //return user data
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

  socket.on("reorder", newQueue => {
    let { ID, Time } = queue[currentSong];
    queue = newQueue;
    newQueue.forEach((song, idx) => {
      if (song.ID === ID && song.Time === Time) {
        currentSong = idx;
      }
    });
    updateClients();
  });

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

  socket.on("removeFromQueue", song => {
    if (song.Type && song.ID && song.Time) {
      queue = queue.filter(sng => {
        return sng.ID !== song.ID && sng.Time !== song.Time;
      });
    } else {
      socket.emit("queueError");
    }
    updateClients();
  });

  //Someone pressed "Add to Queue"
  socket.on("queue", song => {
    if (song.Type && song.ID) {
      song.Time = unixTimestamp();
      queue.push(song);
    } else {
      socket.emit("queueError");
    }
    updateClients();
  });

  socket.on("queueMultiple", songArray => {
    if (songArray) {
      queue = [
        ...queue,
        ...songArray.map((song, idx) => ({
          ...song,
          Time: unixTimestamp() + idx
        }))
      ];
    } else {
      socket.emit("queueError");
    }
    updateClients();
  });

  //Someone pressed "Play Next"
  socket.on("playNextMultiple", songArray => {
    if (songArray) {
      queue.splice(
        currentSong + 1,
        0,
        ...songArray.map((song, idx) => ({
          ...song,
          Time: unixTimestamp() + idx
        }))
      );
    } else {
      socket.emit("playNextError");
    }
    updateClients();
  });

  socket.on("playNext", song => {
    if (song.Type && song.ID) {
      song.Time = unixTimestamp();
      queue.splice(currentSong + 1, 0, song);
    } else {
      socket.emit("playNextError");
    }
    updateClients();
  });

  //Someone chose a song in the existing "Queue"
  socket.on("play", song => {
    playSong(song)
  });

  //Someone pressed the play pause
  socket.on("playpause", song => {
    if (Player.state === "playing") {
      Player.pause();
    } else if (Player.state === "paused") {
      Player.resume();
    } else if (Player.state === "constructed") {
      playSong(queue[currentSong])
    }
    //Tell the python to stop or start
    updateClients();
  });

  //Someone hit the arrow for the previous track
  socket.on("prevTrack", song => {
    currentSong -= 1;
    //Tell python to start the prev track
    playSong(queue[currentSong])
    updateClients();
  });

  //Someone hit the arrow for the next track
  socket.on("nextTrack", data => {
    currentSong += 1;
    playSong(queue[currentSong])
    updateClients();
  });

  //Someone moved the slider and let go
  socket.on("scrub", data => {
    if (data.timestamp) {
      //TODO: Call python to play the song from the specified time
      Player.scrub(data.timestamp);
    } else {
      socket.emit("scrubError");
    }
    updateClients();
  });

  socket.on("addToLibrary", async song => {
    if (song.Type && song.ID) {
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

      const artistImage = await spotifyservice.attemptFindArtistImage(song.Artist);
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

      newsong.save(async err => {
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

  socket.on('setArtistImage', async ({name, image}) => {
    await Song.updateMany({ artist: name }, { artistImage: image }).exec();
    io.emit("reloadLibrary", await getLibrary());
  })

  socket.on('setAlbumImage', async ({name, image}) => {
    await Song.updateMany({ album: name }, { image: image }).exec();
    io.emit("reloadLibrary", await getLibrary());
  })

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
