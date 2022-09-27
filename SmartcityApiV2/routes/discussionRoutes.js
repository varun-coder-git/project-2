const express = require('express');
const router = express.Router();
const discussionController = require('../controller/discussionController');
const auth = require('../middleware/auth');
const app = express();
router.use(auth);

router.post('/GetAllDiscussion', function (req, res) {
    discussionController.getAllDiscussion(req, res);
});

router.put('/RegisterDiscussion', function (req, res) {
    discussionController.addNewDiscussion(req, res);
});

router.post('/UpdateDiscussion', function (req, res) {
    discussionController.updateDiscussion(req, res);
});

app.use('/',router);
module.exports = router;