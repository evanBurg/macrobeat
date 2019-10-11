const express = require("express");
const app = express();
const http = require("http");
const routes = require("./src/back_end/routes/routes");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./public"));

app.use("/api/", routes);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

let server = http.createServer(app);
let io = socketIO(server);


let users = [];
let queue = [];
let currentSong = 0;
let playing = false;

updateClients = () => {
  io.emit('update', {
    queue,
    currentSong,
    playing
  });
}

io.on("connection", async socket => {

  //On initial connection, check if the user already has their login stored
  socket.on('init', data => {
    if(data.username && data.icon){

      users.push(data);
      socket.username = data.username;

      socket.emit('init', {loggedIn: true});
    }else{
      socket.emit('init', {loggedIn: false});
    }

    updateClients();
  });

  //Someone pressed "Add to Queue"
  socket.on('queue', song => {
    if(song.Type && data.ID){

      queue.push(data);

    }else{
      socket.emit('queueError');
    }

    updateClients();
  })

  //Someone pressed "Play Next"
  socket.on('playNext', song => {
    if(song.Type && data.ID){

      queue.splice(currentSong, 0, data);

    }else{
      socket.emit('playNextError');
    }

    updateClients();
  })

  //Someone chose a song in the existing "Queue"
  socket.on('play', song => {
    if(song.Type && data.ID){

      //TODO: Call python to play the song

    }else{
      socket.emit('playError');
    }
    
    updateClients();
  })

  //Someone pressed the play pause
  socket.on('playpause', song => {
    playing != playing;

    //Tell the python to stop or start
    
    updateClients();
  })

  //Someone hit the arrow for the previous track
  socket.on('prevTrack', data => {
    playing = false;
    currentSong -= 1;

    //Tell python to start the prev track
    playing = true;
    
    updateClients();
  })

  //Someone hit the arrow for the next track
  socket.on('nextTrack', data => {
    playing = false;
    currentSong += 1;

    //Tell python to start the prev track
    playing = true;
    
    updateClients();
  })

  //Someone moved the slider and let go
  socket.on('scrub', data => {
    if(data.timestamp){
      playing = false;
  
      //TODO: Call python to play the song from the specified time
      playing = true;

    }else{
      socket.emit('scrubError');
    }
    
    updateClients();
  })

  socket.on('addToLibrary', song => {
    if(song.Type && data.ID){

      //Add to users mongo library

    }else{
      socket.emit('addToLibraryError');
    }

    updateClients();
  })
});

server.listen(port, () => console.log(`Listening on port ${port}...`));
