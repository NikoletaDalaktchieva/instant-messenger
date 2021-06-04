const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/:id', messageController.getMessage);
router.get('/', messageController.sortMessagesByDate);
router.post('/', messageController.create);

module.exports.messageRouter = router;