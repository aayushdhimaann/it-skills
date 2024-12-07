const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  branch: {
    type: String,
    required: true,
    trim: true,
  },
  date_of_admission: {
    type: Date,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
    trim: true,
  },
  course_duration: {
    type: String,
    required: true,
    trim: true,
  },
  student_name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  father_name: {
    type: String,
    required: true,
    trim: true,
  },
  father_occupation: {
    type: String,
    trim: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  education_details: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  phone_alt: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  course_fee: {
    type: String,
    required: true,
    trim: true,
  },
  deposited_fee: {
    type: String,
    required: true,
    trim: true,
  },
  certi_date: {
    type: Date,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

studentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
module.exports = Student;
