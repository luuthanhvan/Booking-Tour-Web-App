const express = require('express');
const router = express.Router();
const manageController = require('../app/controllers/ManageController');
const upload = require('../config/upload');

router.get('/manage/tour', manageController.tour);
router.post('/manage/tour/add', manageController.submitTourInfo);
router.post('/manage/tour/delete', manageController.deleteTourInfo);

router.get('/manage/dest', manageController.dest);
router.post('/manage/dest/add', upload.single("destImg"), manageController.submitDestInfo);
router.post('/manage/dest/delete', manageController.deleteDestInfo);
router.post('/manage/dest/edit', manageController.editDestInfo);
router.post('/manage/dest/update', upload.single("destImg"), manageController.updateDestInfo);

router.get('/manage', manageController.index);

module.exports = router;
