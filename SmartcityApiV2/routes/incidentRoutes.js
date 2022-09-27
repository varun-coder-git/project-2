const express = require('express');
const router = express.Router();
const incidentController = require('../controller/incidentController');
const app = express();
router.use(auth);

router.post('/GetIncidents', function (req, res) {
    incidentController.getIncident(req, res);
});

router.post('/GetIncidentById', function (req, res) {
    incidentController.getIncidentDetailsById(req, res);
});

router.post('/GetCategory', function (req, res) {
    incidentController.getIncidentCategory(req, res);
});

router.post('/GetStatus', function (req, res) {
    incidentController.getIncidentStatusCategory(req, res);
});

router.post('/DeleteIncident', function (req, res) {
    incidentController.deleteIncident(req, res);
});

router.put('/UpdateStatus', function (req, res) {
    incidentController.updateIncidentStatus(req, res);
});

router.put('/AddIncidentComment', function (req, res) {
    incidentController.addIncidentComment(req, res);
});

router.post('/DeleteIncidentComment', function (req, res) {
    incidentController.deleteIncidentComment(req, res);
});

router.put('/RegisterIncident', function (req, res) {
    incidentController.createIncident(req, res);
});

router.post('/Search', function (req, res) {
    incidentController.searchIncident(req, res);
});

router.post('/IncidentStatus', function (req, res) {
    incidentController.myIncidentStatus(req, res);
});

router.post('/UpdateIncidentFeedback', function (req, res) {
    incidentController.getMyIncidentFeedback(req, res);
});

app.use('/',router);
module.exports = router;