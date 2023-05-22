const csv = require("csvtojson");
const csvModel = require("../models/csv-user");
const { model } = require("mongoose");

module.exports.importCsv = async (req, res) => {
  try {
    let newCSV;
    console.log(req.file);
    csv()
      .fromFile(req.file.path)
      .then(async (data) => {
        newCSV = await csvModel.create({
          name: req.body.name,
        });

        for (let i = 0; i < data.length; i++) {
          newCSV.csvfiles.push(data[i]);
        }
        newCSV.save();
        let keyname = newCSV.csvfiles[0];
        console.log(Object.keys(keyname));

        return res.status(200).json({ success: true, data: newCSV });
      });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};

module.exports.getCsv = async (req, res) => {
  try {
    const pageNumber = req.query.page || 1; // Get the current page number from the query parameters
    const pageSize = 2; // Number of items per page

    // csvModel
    //   .paginate({}, { offset: pageNumber - 1, limit: pageSize })
    //   .then((result) => {
    //     console.log(result.docs);
    //     // result.findOne({name: 'extra'});
    //     return res.json({ data: result });
    //   });

    let data = await csvModel.find({});

    if (!data) {
      return res.status(400).json({
        message: "not data available!",
      });
    }

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let newData = data.slice(startIndex, endIndex);
    console.log(newData);

    // return res.status(200).json({
    //   message: "success",
    //   success: true,
    //   data: newData,
    // });

    return res.status(200).render("index", {});
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};

module.exports.getBySearch = async (req, res) => {
  try {
    let data = await csvModel.find({ name: req.query.name });

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
    let pageSize = 2; // Number of items per page

    let data = await csvModel.findById(req.params.id);
    console.log(req.body.id);

    // console.log("data: ", data.csvfiles);
    // let keyname = data.csvfiles[0];
    // keyname = Object.keys(keyname);
    // console.log(keyname);
    // console.log(keyname[0]);

    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    let newData = data.csvfiles.slice(startIndex, endIndex);
    console.log(newData);

    return res.status(200).json({
      message: "success",
      success: true,
      data: newData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false });
  }
};
