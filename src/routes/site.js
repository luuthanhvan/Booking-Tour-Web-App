const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/sign-up', siteController.signUp);
router.post('/sign-up', siteController.addCustomerInfo)
router.get('/sign-in', siteController.signIn);
router.get('/tourDetails', siteController.seeDetails)
router.post('/search', siteController.searchTour);
router.get('/', siteController.index);

module.exports = router;
