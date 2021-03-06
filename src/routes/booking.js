const express = require('express');
const router = express.Router();
const bookingController = require('../app/controllers/BookingController');

router.post('/booking/bookingDetails',
    bookingController.submitInvoiceInfo,
    bookingController.submitCustomersInfoWithoutAccount,
    bookingController.showBookingInfo
);

router.get('/booking', bookingController.index);

module.exports = router;
