const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate");

const csvSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    csvfiles: [mongoose.Schema.Types.Mixed],
  },
  { strict: false }
);

// csvSchema.plugin(mongoosePaginate);

const CSV = mongoose.model("Csvfile", csvSchema);
module.exports = CSV;
