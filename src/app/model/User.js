const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true, // Ensures that the name field is always provided
    trim: true // Removes leading and trailing spaces
  },
  email: {
    type: String,
    required: true, // Ensures that the email field is always provided
    unique: true, // Ensures that the email is unique across the collection
    trim: true,
    lowercase: true // Converts the email to lowercase before saving
  },
  password: {
    type: String,
    required: true // Ensures that the password field is always provided
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current date when a document is created
  },
  updatedAt: {
    type: Date,
    default: Date.now // Automatically sets the current date when a document is created
  }
});

// Update the `updatedAt` field before saving the document
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
