const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.post('/GetFeedback', function (req, res) {
    feedbackController.getFeedback(req, res);
});

router.post('/DeleteFeedback', function (req, res) {
    feedbackController.deleteFeedBack(req, res);
});

router.post('/GetFeedbackById', function (req, res) {
    feedbackController.getFeedbackById(req, res);
});

app.use('/',router);
module.exports = router;
