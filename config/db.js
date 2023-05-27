const mongoose = require("mongoose");
// XY8piF8vNDPwjAFC
mongoose
  .connect(
    "mongodb+srv://rk1759593:XY8piF8vNDPwjAFC@cluster0.tvdlqln.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connection connected!");
  })
  .catch((e) => {
    console.log("connection not connected!", e);
  });
