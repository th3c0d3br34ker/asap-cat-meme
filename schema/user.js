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

// Create the Meme model
const Meme = mongoose.model('users', usersSchema);

// Export the Meme model
module.exports = Meme;
