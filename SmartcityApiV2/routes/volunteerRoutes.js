const express = require('express');
const router = express.Router();
const volunteerController = require('../controller/volunteerController');
const auth = require('../middleware/auth');

router.post('/RegisterVolunteer',auth, function (req, res) {
    volunteerController.addVolunteer(req, res);
});

router.post('/CheckVolunteer',auth, function (req, res) {
    volunteerController.checkVolunteerStatus(req, res);
});

router.post('/CancelVolunteer',auth, function (req, res) {
    volunteerController.cancelVolunteer(req, res);
});

router.post('/DeleteVolunteer',auth, function (req, res) {
    volunteerController.deleteVolunteer(req, res);
});

router.post('/GetVolunteers', function (req, res) {
    volunteerController.getAllVolunteer(req, res);
});

router.put('/UpdateStatus',auth, function (req, res) {
    volunteerController.updateVolunteerStatus(req, res);
});

router.put('/UpdateVolunteerInfo',auth, function (req, res) {
    volunteerController.updateVolunteerInfo(req, res);
});

router.post('/AddCategory',auth, function (req, res) {
    volunteerController.addVolunteerCategory(req, res);
});

router.post('/GetCategory',auth, function (req, res) {
    volunteerController.getVolunteerCategory(req, res);
});

router.put('/UpdateCategory',auth, function (req, res) {
    volunteerController.updateVolunteerCategory(req, res);
});

router.post('/DeleteCategory', function (req, res) {
    volunteerController.deleteVolunteerCategory(req, res);
});

router.post('/VolunteerForm',auth, function (req, res) {
    volunteerController.showVolunteerForm(req, res);
});

router.post('/MostTrending', function (req, res) {
    volunteerController.mostTrendingVolunteer(req, res);
});

router.post('/MostDiscussed', function (req, res) {
    volunteerController.mostDiscussVolunteer(req, res);
});

router.post('/GetVolunteerById',auth, function (req, res) {
    volunteerController.getVolunteerById(req, res);
});

router.post('/AddComment',auth, function (req, res) {
    volunteerController.addVolunteerComment(req, res);
}); 

router.post('/DeleteComment',auth, function (req, res) {
    volunteerController.deleteVolunteerComment(req, res);
});

router.post('/GetVolunteer',auth, function (req, res) {
    volunteerController.getAdminVolunteer(req, res);
});

router.post('/Search', function (req, res) {
    volunteerController.searchVolunteer(req, res);
});
module.exports = router;