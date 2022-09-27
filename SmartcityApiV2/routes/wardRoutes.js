const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const app = express();
router.use(auth);
const wardController = require('../controller/wardController')

router.post('/GetTopWard', function (req, res) {
    wardController.topPerformingWard(req, res);
});

router.post('/GetLessWard', function (req, res) {
    wardController.wardsNeedImprovement(req, res);
});

router.post('/GetTopWardChart', function (req, res) {
    wardController.topWardChart(req, res);
});

router.post('/GetLessWardChart', function (req, res) {
    wardController.lessWardChart(req, res);
});

app.use('/',router);
module.exports = router;