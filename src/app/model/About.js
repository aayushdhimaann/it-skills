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
});

const About = mongoose.models.Aboutus || mongoose.model("Aboutus", aboutSchema);

module.exports = About;
