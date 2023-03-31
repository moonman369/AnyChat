const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const Pusher = require("pusher");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
var http = require("http").Server(app);
// var io = require("socket.io")(http);
var mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbUrl = process.env.DB_URL;

const pusher = new Pusher({
  appId: "1576607",
  key: "8aeb3f98d41009ed0f70",
  secret: "a90676195e1404203084",
  cluster: "ap2",
  // useTLS: true,
});

const Message = mongoose.model("Message", {
  name: String,
  message: String,
});
const messages = [{ name: "John Doe", message: "Genesis Message" }];

app.get("/messages", async (req, res) => {
  const messages = await Message.find({});
  // console.log(messages);
  res.send(messages);
});

app.get("/messages/:user", async (req, res) => {
  const user = req.params.user;
  const messages = await Message.find({ name: user });
  messages.length > 0 ? res.send(messages) : res.send([]);
});

app.post("/messages", async (req, res) => {
  if (req.body.name && req.body.message) {
    try {
      // throw ReferenceError;
      // console.log(req.body);
      const message = new Message(req.body);

      const savedMsg = await message.save();

      console.log("Saved.");

      const censoredMessages = await Message.find({ message: "badword" });

      if (censoredMessages.length > 0) {
        console.log("Censored words found", censoredMessages);
        for (let censored of censoredMessages) {
          const remove = await Message.findOneAndRemove({ _id: censored._id });
          console.log(remove);
        }

        res.sendStatus(200);
        return;
      } else {
        pusher.trigger("channel0", "newMsg", {
          message: req.body,
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("message post called");
    }
  }
});

mongoose.connect(dbUrl);

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
