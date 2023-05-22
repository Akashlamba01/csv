const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/csv-uploader")
  .then(() => {
    console.log("connection connected!");
  })
  .catch((e) => {
    console.log("connection not connected!", e);
  });
