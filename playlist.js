const mongoose = require("mongoose");

// Define the schema for a playlist
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end of the name
  },
  songs: [
    {
      song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spotify',
      },
    },
  ],
});

// Create a "Playlist" model from the schema
const Playlist = mongoose.model("playlist", playlistSchema ,"playlist");

module.exports = Playlist;
