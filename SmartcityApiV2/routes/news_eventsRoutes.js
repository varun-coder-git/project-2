const express = require('express');
const router = express.Router();
const newsController = require('../controller/news_eventsController');

// // User Routes
router.get('/news', function (req, res) {
    newsController.getAllNews_events(req, res);
});

router.get('/news/:id', function (req, res) {
    newsController.getNews_eventsId(req, res);
});

router.post('/create', function (req, res) {
    newsController.AddNews_events(req, res);
});


module.exports = router;
