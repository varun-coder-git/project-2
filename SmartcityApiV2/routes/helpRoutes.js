const express = require('express');
const router = express.Router();
const helpController = require('../controller/helpController');


router.post('/HelpEmail', function (req, res) {
    helpController.helpEmail(req, res);
});

module.exports = router;