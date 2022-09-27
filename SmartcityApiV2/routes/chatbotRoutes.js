const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbotController')
const auth = require('../middleware/auth');
const app = express();
router.use(auth);
//Chatbot Report API

router.post('/GetChatbot', function (req, res) {
    chatbotController.getChatbotData(req, res);
});

router.post('/DeleteChatbot', function (req, res) {
    chatbotController.deleteChatbot(req, res);
});

router.post('/GetStatus', function (req, res) {
    chatbotController.getChatbotStatusCategory(req, res);
});

router.put('/UpdateStatus', function (req, res) {
    chatbotController.updateChatbotStatus(req, res);
});

router.post('/GetChatbotById', function (req, res) {
    chatbotController.getChatbotById(req, res);
});

router.put('/RegisterConcern', function (req, res) {
    chatbotController.createChatbot(req, res);
});

app.use('/',router);
module.exports = router;