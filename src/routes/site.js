const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/sign-in', siteController.signIn);
router.post('/sign-in', siteController.signIn);
router.get('/sign-up', siteController.signUp);
router.post('/sign-up', siteController.signUp);

router.get('/', siteController.index);

module.exports = router;
