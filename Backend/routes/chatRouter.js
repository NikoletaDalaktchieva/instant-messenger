const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.getChat);

router.post('/', chatController.create);

module.exports.chatRouter = router;