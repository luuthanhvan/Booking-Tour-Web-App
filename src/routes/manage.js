const express = require('express');
const router = express.Router();
const manageController = require('../app/controllers/ManageController');

router.get('/manage/tour', manageController.tour);
router.post('/manage/tour/add', manageController.submitTourInfo);
router.post('/manage/tour/delete', manageController.deleteTourInfo);

router.get('/manage/dest', manageController.dest);
router.post('/manage/dest/add', manageController.submitDestInfo);
router.post('/manage/dest/delete', manageController.deleteDestInfo);

router.get('/manage', manageController.index);

module.exports = router;
