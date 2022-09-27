const express = require('express');
const router = express.Router();
const pollController = require('../controller/pollController')
const auth = require('../middleware/auth');

router.post('/GetPolls', function (req, res) {
    pollController.getAdminPoll(req, res);
});

router.post('/GetRecentPoll', function (req, res) {
    pollController.getPoll(req, res);
});

router.post('/GetCategory',auth, function (req, res) {
    pollController.getPollCategory(req, res);
});

router.put('/RegisterPoll',auth, function (req, res) {
    pollController.addPoll(req, res);
});

router.put('/UpdatePoll',auth, function (req, res) {
    pollController.updatePoll(req, res);
});

router.post('/GetPollById',auth, function (req, res) {
    pollController.getPollById(req, res);
});

router.post('/DeletePoll',auth, function (req, res) {
    pollController.deletePoll(req, res);
});

router.post('/MostTrending', function (req, res) {
    pollController.mostTrendingPoll(req, res);
});

router.post('/MostDiscussed', function (req, res) {
    pollController.mostDiscussPoll(req, res);
});

router.put('/VotePoll',auth, function (req, res) {
    pollController.votePoll(req, res);
});

router.post('/PollAnalytics',auth, function (req, res) {
    pollController.getPollAnalytics(req, res);
});

router.post('/Search', function (req, res) {
    pollController.searchPoll(req, res);
});

module.exports = router;