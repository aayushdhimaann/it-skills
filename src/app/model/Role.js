const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Role Schema
const roleSchema = new Schema({
  roleTitle: {
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
roleSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the User model
const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
module.exports = Role;
