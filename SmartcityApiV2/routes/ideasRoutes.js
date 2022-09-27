const express = require('express');
const router = express.Router();
const ideasController = require('../controller/ideasController');
const auth = require('../middleware/auth')

router.post('/GetIdeas', function (req, res) {
    ideasController.getAllIdeas(req, res);
});

router.post('/GetMostDiscussedIdeas', function (req, res) {
    ideasController.GetMostDiscussedIdeas(req, res);
});

router.post('/GetTrendingIdeas', function (req, res) {
    ideasController.GetTrendingIdeas(req, res);
});

router.post('/GetIdeasByUser',auth, function (req, res) {
    ideasController.GetIdeasbyUser(req, res);
});

router.post('/GetIdeaSummary/:id/:is_admin',auth, function (req, res) {
    ideasController.getIdeasbySummaryId(req, res);
});

router.post('/CreateIdea',auth, function (req, res) {
    ideasController.CreateIdea(req, res);
});

router.put('/UpdateIdea',auth, function (req, res) {
    ideasController.UpdateIdea(req, res);
});

router.post('/DeleteIdea',auth, function (req, res) {
    ideasController.DeleteIdea(req, res);
});

router.post('/AddIdeaResponse',auth, function (req, res) {
    ideasController.AddIdeaResponse(req, res);
});

router.post('/DeleteIdeaResponse',auth, function (req, res) {
    ideasController.DeleteIdeaResponse(req, res);
});

router.post('/SearchIdea', function (req, res) {
    ideasController.searchIdea(req, res);
});

router.post('/IdeaCategory',auth, function (req, res) {
    ideasController.getIdeaCategory(req, res);
});

module.exports = router;