const mongoose = require('mongoose');

// Define the User schema
const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the User model
const User = mongoose.model('users', usersSchema);

// Export the User model
module.exports = User;
