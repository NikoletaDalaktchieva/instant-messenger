const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.sortMessagesByDate);
router.post('/', messageController.create);

module.exports.messageRouter = router;