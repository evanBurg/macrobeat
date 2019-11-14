require(`dotenv`).config();
const bodyParser = require(`body-parser`);
const cookieParser = require(`cookie-parser`);
const express = require(`express`);
const app = express();
const http = require(`http`);
const socketIO = require(`socket.io`);
const cors = require(`cors`);
const port = process.env.PORT || 5000;
const {
  searchroutes,
  spotifyroutes,
  userroutes,
  youtuberoutes
} = require(`./src/back_end/routes`);
const { Song } = require(`./src/back_end/models`);

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
let playing = false;

const updateClients = () => {
  io.emit(`update`, {
    queue,
    currentSong,
    playing
  });
};

const getLibrary = () => {
  return new Promise((resolve, reject) => {
    Song.find({}, (error, songs) => {
      if (!error) {
        resolve(songs);
      } else {
        reject(error);
      }
    });
  });
};

io.on("connection", async socket => {
  updateClients();

  //On initial connection, check if the user already has their login stored
  socket.on("init", async data => {
    if (true) {
      //if(data.id){
      //check databse for user data
      //return user data
      socket.emit("init", {
        User: {
          user: "Burgy",
          img: "https://i.imgur.com/nKuE1ep.jpg"
        },
        loggedIn: true,
        library: await getLibrary()
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

  socket.on("identify", data => {
    if (data.username && data.icon) {
      users.push(data);
      //Also save in the database
      socket.username = data.username;
      socket.emit("init", {
        User: {
          user: data.username,
          img: data.icon
        },
        loggedIn: true
      });
    }
    updateClients();
  });

  //Someone pressed "Add to Queue"
  socket.on("queue", song => {
    if (song.Type && song.ID) {
      queue.push(song);
    } else {
      socket.emit("queueError");
    }
    updateClients();
  });

  //Someone pressed "Play Next"
  socket.on("playNext", song => {
    if (song.Type && song.ID) {
      queue.splice(currentSong + 1, 0, song);
    } else {
      socket.emit("playNextError");
    }
    updateClients();
  });

  //Someone chose a song in the existing "Queue"
  socket.on("play", song => {
    if (song.Type && song.ID) {
      //TODO: Call python to play the song
    } else {
      socket.emit("playError");
    }
    updateClients();
  });

  //Someone pressed the play pause
  socket.on("playpause", song => {
    playing = !playing;
    //Tell the python to stop or start
    updateClients();
  });

  //Someone hit the arrow for the previous track
  socket.on("prevTrack", data => {
    playing = false;
    currentSong -= 1;
    //Tell python to start the prev track
    playing = true;
    updateClients();
  });

  //Someone hit the arrow for the next track
  socket.on("nextTrack", data => {
    playing = false;
    currentSong += 1;
    //Tell python to start the prev track
    playing = true;
    updateClients();
  });

  //Someone moved the slider and let go
  socket.on("scrub", data => {
    if (data.timestamp) {
      playing = false;
      //TODO: Call python to play the song from the specified time
      playing = true;
    } else {
      socket.emit("scrubError");
    }
    updateClients();
  });

  socket.on("addToLibrary", song => {
    if (song.Type && song.ID) {
      //Add to users mongo library
      const newsong = new Song({
        uniqueId: song.ID,
        title: song.Name,
        artist: song.Artist,
        album: song.Album,
        image: song.Image,
        source: song.Type
      });
      reload = async () => {
        socket.emit("reloadLibrary", await getLibrary());
      };
      newsong.save(err => {
        if (err) {
          console.log(err);
          socket.emit("addToLibraryError");
        } else {
          reload();
        }
      });
    } else {
      socket.emit("addToLibraryError");
    }
    updateClients();
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
