const { Router } = require('express');
const Controller = require('./controller');
const { requireAuth, checkUser } = require('../auth/authMiddleware');
const DatabaseController = require('./databaseController');

const router = Router();

router.get('/music', Controller.home);

router.get('/music/search', Controller.search);

router.get('/music/link', Controller.music);

router.get('/music/playlist', DatabaseController.playlist);

router.post('/music/song', DatabaseController.song);

router.post('/music/playlistsong', DatabaseController.playlistsong);

router.post('/music/createplaylist', DatabaseController.createplaylist);

router.post('/music/createwatchlist', DatabaseController.createWatchlist);

router.get('/music/asianPlaylist', DatabaseController.asianPlaylist);

router.get('/music/asianPlaylistDrama', DatabaseController.asianPlaylistDrama);

router.post('/music/savetowatchlist', DatabaseController.save_to_watchlist);

module.exports = router;