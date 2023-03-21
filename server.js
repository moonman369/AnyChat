const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname));

const messages = [
  { name: "John Doe", message: "Yes." },
  { name: "Jane Doe", message: "Why?" },
];

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.get("/messages", (req, res) => {
  res.send(messages);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
