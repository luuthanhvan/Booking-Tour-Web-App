const express = require('express');
const router = express.Router();
const bookingController = require('../app/controllers/BookingController');

router.get('/booking', bookingController.index);

module.exports = router;
