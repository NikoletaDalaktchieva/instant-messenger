const express = require('express');
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get('/', chatController.getChat);

module.exports.chatRouter = router;