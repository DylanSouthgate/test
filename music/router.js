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

router.get('/music/DeleteAsianPlaylist', DatabaseController.DeleteAsianPlaylist);

module.exports = router;