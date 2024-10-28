const { createPlaylist, addSongToPlaylist, likeSong, getPlaylists, getLikedSongs } = require("../controllers/PlaylistController");
const router = require('express').Router();

router.post("/create",createPlaylist);
router.patch("/addsong",addSongToPlaylist);
router.patch("/likesong",likeSong);
router.get("/getplaylist",getPlaylists)
router.get("/likedsongs",getLikedSongs)

module.exports = router;