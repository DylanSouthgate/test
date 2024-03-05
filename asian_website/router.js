const { Router } = require('express');
const dramaInfo = require('./routes/dramaInfo');
const genre = require('./routes/genre');

const Playlist = require('./routes/Playlist');
const PlaylistDramas = require('./routes/PlaylistDramas');
const savetoPlaylist = require('./routes/savetoPlaylist');
const createPlaylist = require('./routes/createPlaylist');
const search = require('./routes/search');
const actorInfo = require('./routes/actorInfo')

const router = Router();

router.get('/asian/dramaInfo', dramaInfo);
router.get('/asian/genre', genre);

router.get('/asian/Playlist', Playlist);
router.get('/asian/PlaylistDramas', PlaylistDramas);
router.post('/asian/savetoPlaylist', savetoPlaylist);
router.post('/asian/createPlaylist', createPlaylist);

router.get('/asian/search', search);

router.get('/asian/actorInfo', actorInfo);


module.exports = router;