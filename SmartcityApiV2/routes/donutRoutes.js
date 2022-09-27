const express = require('express');
const router = express.Router();
const donutController = require('../controller/donutController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.post('/DonutDetails', function (req, res) {
    donutController.getDonutDetails(req, res);
});

app.use('/',router);
module.exports = router;
