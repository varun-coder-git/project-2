const express = require('express');
const router = express.Router();
const newsController = require('../controller/newsController')
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.put('/RegisterNews', function (req, res) {
    newsController.RegisterNews(req, res);
});

router.post('/GetNewsCategory', function (req, res) {
    newsController.getNewsCategory(req, res);
});

router.post('/GetNews', function (req, res) {
    newsController.getNews(req, res);
});

router.post('/GetNewsById', function (req, res) {
    newsController.getNewsById(req, res);
});

// router.post('/EditNews', function (req, res) {
//     newsController.AditNews(req, res);
// });

router.post('/AddNewsComment', function (req, res) {
    newsController.addNewsComment(req, res);
});

router.post('/DeleteNewsComment', function (req, res) {
    newsController.deleteNewsComment(req, res);
});

router.post('/DeleteNews', function (req, res) {
    newsController.deleteNews(req, res);
});

router.get('/BreakingNews', function (req, res) {
    newsController.breakingNews(req, res);
});


router.post('/GetNewsOCM', function (req, res) {
    newsController.getNewsOCM(req, res);
});


router.post('/EditNewsById', function (req, res) {
    newsController.editNewsById(req, res);
});

router.put('/updateNews', function (req, res) {
    newsController.updateNews(req, res);
});

router.post('/GetNewsByIdOCM', function (req, res) {
    newsController.getNewsByIdOCM(req, res);
});

app.use('/',router);
module.exports = router;