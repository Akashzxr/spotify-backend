const playlist = require("../models/playlistModel");
const user = require("../models/userModel");
const { getUserId } = require("../middlewares/playlistMiddleware");

//create playlist
module.exports.createPlaylist = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const { name } = req.body;
    //checking is there is a token
    if (!token) {
      return res.json({ status: false });
    }
    //getting the userid from the token
    const userId = await getUserId(token);

    //creating a new playlist
    const newPlaylist = await playlist.create({ name, userId });

    //adding the created playlist id to the users playlist
    const updateUser = await user.findByIdAndUpdate(
      userId,
      { $addToSet: { playlists: { playlistId: newPlaylist._id, playlistName: newPlaylist.name } } }, //$addtoset to prevent duplicate
      { new: true, useFindAndModify: false }
    );

    res.json({
      message: "playlist succesfully created",
      playlist: newPlaylist,
      updateduser: updateUser,
    });
    
  } catch (error) {
    console.error(error);
  }
};

//adding song to a playlist
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

//getting the user playlist data function
module.exports.getPlaylists = async (req,res,next) => {
  try {
    const token = req.cookies.token;
    //checking if ther is a token
    if (!token) {
      return res.json({ status: false });
    }
    //getting the userid from the token
    const userId = await getUserId(token);

     //getting the information from user database
     const userInfo = await user.findById(userId);
     res.json({
      playlists : userInfo.playlists
     })
  } catch (error) {
    console.error(error);
  }
}

//getting the liked songs of user
module.exports.getLikedSongs = async (req,res,next) => {
  try {
    const token = req.cookies.token;
    //checking if ther is a token
    if (!token) {
      return res.json({ status: false });
    }
    //getting the userid from the token
    const userId = await getUserId(token);

    //getting the liked songs
    const userInfo = await user.findById(userId);
    res.json({
     likedsongs: userInfo.likedsongs,
    })
  } catch (error) {
    console.error(error);
  }
}

//getting the songs in the playlist
module.exports.getPlaylistSongs = async (req,res,next) => {
  try {
    const playlistData = await playlist.findById(req.query.playlistId)
    res.json({
      song: playlistData.songs,
    })
  } catch (error) {
    console.log(error);
  }
}

//playlist deleting function
module.exports.deletePlaylist = async (req,res,next) => {
  try {
    const playlistid = req.params.playlistId;
    const playlistResult = await playlist.findById(playlistid)
    const userId = playlistResult.userId
    
    //deleting the playlist id from user
    const userResult = await user.findByIdAndUpdate(
      userId,
      { $pull: { playlists: {playlistId: playlistid}}},
      { new: true }
    )
    
    if (!playlistResult) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    
    res.json({
      message: "deleted the playlist",
      playlist: playlistResult,
      user: userResult,
    })
  } catch (error) {
    console.error(error);
  }
} 
