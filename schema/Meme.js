const mongoose = require('mongoose');

// Define the Meme schema
const memeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  img_url: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the Meme model
const Meme = mongoose.model('memes', memeSchema);

// Export the Meme model
module.exports = Meme;
