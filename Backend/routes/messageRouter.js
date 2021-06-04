const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.sortMessagesByDate);

module.exports.messageRouter = router;