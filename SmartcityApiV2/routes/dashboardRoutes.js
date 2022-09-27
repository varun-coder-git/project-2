const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.post('/Dashboard', function (req, res) {
    dashboardController.getComplaintIncidentLocationDashboard(req, res);
});

app.use('/',router);
module.exports = router;
