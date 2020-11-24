const express = require('express');
const router = express.Router();
const bookingController = require('../app/controllers/BookingController');

router.post('/booking/bookingDetails',
    bookingController.addInvoiceInfo,
    bookingController.addCustomersInfo,
    bookingController.showBookingInfo
);

// router.get('/temp', bookingController.tempFuntionHandler);

router.get('/booking', bookingController.index);

module.exports = router;
