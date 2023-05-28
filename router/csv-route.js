const express = require("express");
const router = express.Router();
const csvControler = require("../controller/csv");
const CSV = require("../models/csv-user");
const csv = require("csvtojson");
// const csv = require("../config/csv-uploader");

const multer = require("multer");
const path = require("path");

let ex = function () {
  console.log(path.join(__dirname, "../uploads"));
};

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".csv");
  },
});

const upload = multer({
  storage: storage,

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".csv") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

router.post("/addCsv", upload.single("file"), csvControler.importCsv);
router.post("/deleteCsv/:id", csvControler.deleteCsv);

router.get("/", csvControler.getCsv);
router.get("/:id/?page", csvControler.getBySearch);
router.get("/:id", csvControler.getAllDetails);

module.exports = router;
