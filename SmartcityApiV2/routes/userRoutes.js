const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const auth = require('../middleware/auth');

router.post('/Login', function (req, res) {
    userController.authenticateLogin(req, res);
});

router.post('/AdminLogin', function (req, res) {
    userController.authenticateAdmin(req, res);
});

router.post('/Register', function (req, res) {
    userController.userRegistration(req, res);
});

router.get('/Pincode',function (req, res) {
    userController.getPincodeDetails(req, res);
});

router.post('/MobileOTP', function (req, res) {
    userController.userMobileOTPVerify(req, res);
});

router.post('/ResendOTP', function (req, res) {
    userController.userResendOTP(req, res);
});

router.post('/Profile',auth, function (req, res) {
    userController.userProfile(req, res);
});

router.put('/UpdateProfile',auth, function (req, res) {
    userController.userUpdateProfile(req, res);
});

router.post('/EmailOTP', function (req, res) {
    userController.userEmailOTP(req, res);
});

router.post('/VerifyOTP', function (req, res) {
    userController.userEmailOTPVerify(req, res);
});

router.post('/SetNewPassword', function (req, res) {
    userController.userUpdateNewPassword(req, res);
});

router.post('/BloodGroup',auth, function (req, res) {
    userController.getBloodGroupCategory(req, res);
});

router.post('/ForgetPassword', function (req, res) {
    userController.userForgetPassword(req, res);
});

router.put('/ResetPassword', function (req, res) {
    userController.userResetPassword(req, res);
});

router.post('/ChangePassword',auth, function (req, res) {
    userController.changeUserPassword(req, res);
});

router.post('/Signout',auth, function (req, res) {
    userController.userSignOut(req, res);
});

module.exports = router;