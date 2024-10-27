const { createPlaylist, addSongToPlaylist, likeSong } = require("../controllers/PlaylistController");
const router = require('express').Router();

router.post("/create",createPlaylist);
router.patch("/addsong",addSongToPlaylist);
router.patch("/likesong",likeSong);

module.exports = router;