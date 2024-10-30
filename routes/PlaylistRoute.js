const { createPlaylist, addSongToPlaylist, likeSong, getPlaylists, getLikedSongs, getPlaylistSongs,deletePlaylist } = require("../controllers/PlaylistController");
const router = require('express').Router();

router.post("/create",createPlaylist);
router.patch("/addsong",addSongToPlaylist);
router.patch("/likesong",likeSong);
router.get("/getplaylist",getPlaylists)
router.get("/likedsongs",getLikedSongs)
router.get("/playlistsongs",getPlaylistSongs)
router.delete("/deleteplaylist/:playlistId",deletePlaylist)

module.exports = router;