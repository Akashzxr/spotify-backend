const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "user id is required"],
    }, 
    name: {
      type: String,
      required: [true, "name is required"],
    },
    songs: [{
      type: String,
      required: false,
    }],
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });
  

  module.exports = mongoose.model("Playlist", playlistSchema);