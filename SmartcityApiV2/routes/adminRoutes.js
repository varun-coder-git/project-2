const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const auth = require('../middleware/auth');


router.post('/Register', function (req, res) {
    adminController.adminRegistration(req,res);
});

router.post('/VerifyOTP', function (req, res) {
    adminController.userEmailOTPVerify(req, res);
});

router.post('/ResendOTP', function (req, res) {
    adminController.adminResendOTP(req, res);
});

router.post('/Profile',auth, function (req, res) {
    adminController.adminProfile(req, res);
});

router.put('/UpdateProfile',auth, function (req, res) {
   adminController.adminUpdateProfile(req, res);
});

router.post('/ChangePassword',auth, function (req, res) {
    adminController.changeAdminPassword(req, res);
});

router.post('/ForgetPassword', function (req, res) {
    adminController.adminForgetPassword(req, res);
});

router.put('/ResetPassword', function (req, res) {
    adminController.adminResetPassword(req, res);
});

router.post('/AdminProfileInfo',auth, function (req, res) {
    adminController.adminProfileInfo(req, res);
});

router.post('/VerifyAdminChangePassword',auth, function (req, res) {
   adminController.VerifyAdminChangePassword(req, res);
});

module.exports = router;