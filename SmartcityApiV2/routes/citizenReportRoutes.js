const express = require('express');
const router = express.Router();
const citizenReportController = require('../controller/citizenReportController')

router.post('/GetCitizenReport', function (req, res) {
    citizenReportController.getCitizenData(req, res);
});

router.post('/GetCitizenById', function (req, res) {
    citizenReportController.getCitizenById(req, res);
});

router.post('/DeleteCitizen', function (req, res) {
    citizenReportController.deleteCitizen(req, res);
});

module.exports = router;