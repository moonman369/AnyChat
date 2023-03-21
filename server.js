const bodyParser = require("body-parser");
const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const messages = [
  { name: "John Doe", message: "Yes." },
  { name: "Jane Doe", message: "Why?" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.post("/messages", (req, res) => {
  //   console.log(req.body);
  messages.push(req.body);
  io.emit("message", req.body);
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("a user just connected");
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
