const express = require('express');
const router = express.Router();
const whatsTrendingController = require('../controller/whatsTrendingController');


router.post('/GetWhatsTrending', function (req, res) {
    whatsTrendingController.getWhatsTrending(req, res);
});


module.exports = router;
