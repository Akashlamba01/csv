const express = require("express");
const router = express.Router();
const csvControler = require("../controller/csv");
// const csv = require("../config/csv-uploader");

router.use("/", require("./csv-route"));

module.exports = router;
