const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the course Schema
const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "CourseCategory",
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
courseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
// create and export course model
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
module.exports = Course;
