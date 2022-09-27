const express = require('express');
const router = express.Router();
const complaintController = require('../controller/complaintController')
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.put('/RegisterComplaint', function (req, res) {
    complaintController.createComplaint(req, res);
});
    
router.post('/GetComplaint', function (req, res) {
    complaintController.getComplaint(req, res);
});

router.post('/GetComplaintSummaryById', function (req, res) {
    complaintController.getComplaintSummaryById(req, res);
});

router.post('/Category', function (req, res) {
    complaintController.getComplaintCategory(req, res);
});

router.put('/UpdateStatus', function (req, res) {
    complaintController.updateComplaintStatus(req, res);
});

router.post('/GetComplaintStatus', function (req, res) {
    complaintController.getComplaintStatus(req, res);
});

router.post('/Search', function (req, res) {
    complaintController.searchComplaint(req, res);
});

router.post('/ComplaintStatus', function (req, res) {
    complaintController.myComplaintStatus(req, res);
});

router.post('/DeleteComplaint', function (req, res) {
    complaintController.deleteComplaint(req, res);
});

router.put('/AddComment', function (req, res) {
    complaintController.addComment(req, res);
});

router.post('/DeleteComment', function (req, res) {
    complaintController.deleteComment(req, res);
});

router.post('/GetComplaintFeedback', function (req, res) {
    complaintController.getMyComplaintFeedback(req, res);
});

app.use('/',router);
module.exports = router;