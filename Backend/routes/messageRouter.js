const express = require('express');
const router = express.Router();
//const MongoClient = require('mongodb').MongoClient;
const messageController = require("../controllers/messageController");

router.get('/', messageController.getMessage);

module.exports.messageRouter = router;