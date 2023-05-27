const express = require("express");
const db = require("./config/db");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("assets"));

// app.use("/", require("./router"));
app.use("/", require("./router"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`surver is running on the port: ${PORT}`);
});
