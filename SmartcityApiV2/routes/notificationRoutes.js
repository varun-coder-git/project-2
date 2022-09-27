const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.post('/Notification', function (req, res) {
    notificationController.getNotificationDetails(req, res);
});

app.use('/',router);
module.exports = router;