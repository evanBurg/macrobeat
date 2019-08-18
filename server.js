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

io.on("connection", async socket => {
});

server.listen(port, () => console.log(`Listening on port ${port}...`));
