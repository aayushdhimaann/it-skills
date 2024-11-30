const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  data: {
    type: Schema.Types.Mixed, // Allow any type of data (dynamic key-value pairs)
    default: {},
  },
});

const Aboutus =
  mongoose.models.Aboutus || mongoose.model("Aboutus", aboutSchema);

module.exports = Aboutus;
