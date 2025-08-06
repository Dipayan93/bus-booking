const express = require('express');
const router = express.Router();
const busController = require('../controller/busController')

router.post('/users',busController.addUsers)
router.get('/users', busController.getallUsers)
router.post('/buses',busController.addBus)
router.get('/buses/available/:seats', busController.busAvailableSeats)
module.exports = router;