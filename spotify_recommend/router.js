const { Router } = require('express');
const spotifyController = require('./controller');

const router = Router();

router.get('/spotify', spotifyController.home);
router.get('/spotify/search', spotifyController.search);
router.get('/spotify/similar', spotifyController.similar);
router.get('/spotify/info', spotifyController.info);

module.exports = router;