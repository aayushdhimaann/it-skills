const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the CourseCategory Schema
const courseCategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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

// Update the `updatedAt` field before saving the document
courseCategorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the CourseCategory model
const CourseCategory =
  mongoose.models.CourseCategory ||
  mongoose.model("CourseCategory", courseCategorySchema);
module.exports = CourseCategory;
