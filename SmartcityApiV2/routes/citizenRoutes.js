const express = require('express');
const router = express.Router();
const citizenController = require('../controller/citizenController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.post('/GetCitizenCount', function (req, res) {
    citizenController.GetCitizenCount(req, res);
});

app.use('/',router);
module.exports = router;