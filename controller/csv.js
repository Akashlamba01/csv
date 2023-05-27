const csv = require("csvtojson");
const CSVModel = require("../models/csv-user");

const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

module.exports.importCsv = async (req, res) => {
  try {
    let newCSV;
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        newCSV = await CSVModel.create({
          name: req.body.name,
        });

        for (let i = 0; i < data.length; i++) {
          newCSV.csvfiles.push(data[i]);
        }
        newCSV.save();
        let keyname = newCSV.csvfiles[0];

        await unlinkAsync(req.file.path);

        return res.status(200).redirect("back");
      });
  } catch (error) {
    // console.log(error);
    return res.status(400).send({ success: false });
  }
};

module.exports.deleteCsv = async (req, res) => {
  try {
    let data = await CSVModel.findById(req.params.id);

    if (!data) {
      return res.status(400).json({
        message: "not data available!",
      });
    }

    data.deleteOne();

    return res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};

module.exports.getCsv = async (req, res) => {
  try {
    const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    const pageSize = 20; // Number of items per page

    let data = await CSVModel.find({});

    if (!data) {
      return res.status(400).json({
        message: "not data available!",
      });
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let newData = data.slice(startIndex, endIndex);
    // console.log(newData);

    return res.status(200).render("index", {
      title: "csv file",
      // page: pageNumber,
      csv_files: newData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};

module.exports.getBySearch = async (req, res) => {
  try {
    let data = await CSVModel.find({ name: req.query.name });

    if (!data) {
      return res.status(400).json({
        message: "no data available!",
      });
    }

    return res.status(200).json({
      message: "success",
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};

module.exports.getAllDetails = async (req, res) => {
  try {
    let pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    let pageSize = 100; // Number of items per page

    let data = await CSVModel.findById(req.params.id);

    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    let newData = data.csvfiles.slice(startIndex, endIndex);

    if (newData.length == 0) {
      return res.status(404).render("notFound");
    }
    let keyname = newData[0];

    keyname = Object.keys(keyname);

    return res.status(200).render("dataTable", {
      message: "success",
      success: true,
      title: "data table",
      id: data.id,
      page: pageNumber,
      keyname: keyname,
      name: data.name,
      data: newData,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).send({ success: false });
  }
};
