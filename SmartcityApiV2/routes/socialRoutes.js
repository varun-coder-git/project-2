const express = require('express');
const router = express.Router();
const socialController = require('../controller/socialController');
const auth = require('../middleware/auth');

router.post('/SocialLogin', (req, res) => {
    socialController.getGoogleLogin(req, res);
});

router.post('/SocialProfile',auth, (req, res) => {
    socialController.getGoogleProfile(req, res);
});

router.put('/UpdateSocialProfile',auth, function (req, res) {
    socialController.updateGoogleProfile(req, res);
});

module.exports = router;