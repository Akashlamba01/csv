const express = require("express");
const db = require("./config/db");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use("/", require("./router"));
app.use("/", require("./router"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`surver is running on the port: ${PORT}`);
});
