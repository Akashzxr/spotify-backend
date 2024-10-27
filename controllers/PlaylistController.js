const playlist = require("../models/playlistModel");
const user = require("../models/userModel");
const { getUserId } = require("../middlewares/playlistMiddleware");

//create playlist

module.exports.createPlaylist = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { name, songs } = req.body;
    //checking is there is a token
    if (!token) {
      return res.json({ status: false });
    }
    //getting the userid from the token
    const userId = await getUserId(token);

    //creating a new playlist
    const newPlaylist = await playlist.create({ name, songs, userId });
    res.json({
      message: "playlist succesfully created",
      playlist: newPlaylist,
    });

    //adding the created playlist id to the users playlist
    const updateUser = await user.findByIdAndUpdate(
      userId,
      { $addToSet: { playlists: newPlaylist._id } }, //$addtoset to prevent duplicate
      { new: true, useFindAndModify: false }
    );
  } catch (error) {
    console.error(error);
  }
};

//updating a playlist

module.exports.addSongToPlaylist = async (req, res, next) => {
  try {
    const updateplaylist = await playlist.findByIdAndUpdate(
      req.body.playlistId,
      { $addToSet: { songs: req.body.songId } }, //$addtoset to prevent duplicate
      { new: true, useFindAndModify: false }
    );
    if (!updateplaylist) {
      console.log("playlist not found");
      return;
    }
    res.json({ updatedPlaylist: updateplaylist });
  } catch (error) {
    console.log(error);
  }
};

//song liking function
module.exports.likeSong = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    //checking is there is a token
    if (!token) {
      return res.json({ status: false });
    }
    //getting the userid from the token
    const userId = await getUserId(token);

    //updating the likedsongs field in users
    const addLikedSong = await user.findByIdAndUpdate(
        userId,
        { $addToSet: { likedsongs: req.body.songId } }, //$addtoset to prevent duplicate
        { new: true, useFindAndModify: false }
      );

      res.json({
        message: "added song to liked",
      })

  } catch (error) {
    console.error(error);
  }
};
