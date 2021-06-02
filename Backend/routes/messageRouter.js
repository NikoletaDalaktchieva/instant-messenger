const express = require('express');
const router = express.Router();
const messageController = require("../controllers/messageController");

// ? chat_id
router.get('/:id', messageController.getMessage);

module.exports.messageRouter = router;