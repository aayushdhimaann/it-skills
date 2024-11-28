const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining the Schema
const courseDurationSchema = new Schema({
  title: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date when a document is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date when a document is created
  },
});

courseDurationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const CourseDuration =
  mongoose.models.CourseDuration ||
  mongoose.model("CourseDuration", courseDurationSchema);

module.exports = CourseDuration;
