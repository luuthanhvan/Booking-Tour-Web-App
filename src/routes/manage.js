const express = require('express');
const router = express.Router();
const manageController = require('../app/controllers/ManageController');

router.get('/manage/tour', manageController.tour);
router.get('/manage/editTour', manageController.editTour);
router.get('/manage/deleteTour', manageController.deleteTour);
router.get('/manage/listTour', manageController.listTour);
// router.post('/manage/tour/add', manageController.getTourInfo);
router.get('/manage/dest', manageController.dest);
router.get('/manage/editDest', manageController.editDest);
router.get('/manage/deleteDest', manageController.deleteDest);
router.get('/manage/listDest', manageController.listDest);
router.get('/manage', manageController.index);

module.exports = router;
