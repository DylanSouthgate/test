const { Router } = require('express');
const asianController = require('./controller');

const router = Router();

router.get('/asian', asianController.homepage_get);

router.get('/asian/search', asianController.search);

router.get('/asian/genre', asianController.genre);

router.get('/asian/info', asianController.info);

router.get('/asian/actorInfo', asianController.actorInfo);


module.exports = router;