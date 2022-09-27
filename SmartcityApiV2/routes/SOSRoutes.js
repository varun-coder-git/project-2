const express = require('express');
const router = express.Router();
const SOSController = require('../controller/SOSController')


router.post('/SOS', function (req, res) {
    SOSController.getSOSData(req, res);
});

module.exports = router;