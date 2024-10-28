const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    playlists: [{
     playlistId:{
       type: mongoose.Schema.Types.ObjectId,
      ref: 'Playlist'  // References the Playlist model
     },
     playlistName: {
       type: String,
     }
    }],
    likedsongs : [{
      type: String,
    }],
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default : "user",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });
  
  userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
  module.exports = mongoose.model("User", userSchema);