const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/sign-up', siteController.diplaySignupPage);
router.post('/sign-up/handleSignup', siteController.addCustomerInfo, siteController.addAccountInfo);

router.get('/sign-in', siteController.displaySigninPage);
router.post('/handleExistedUser', siteController.existedUser);
router.post('/sign-in/handleSignin', siteController.invalidPassword, siteController.setSession, siteController.signin);

router.get('/tourDetails', siteController.seeDetails)
router.post('/search', siteController.searchTour);
router.get('/', siteController.index);

module.exports = router;
