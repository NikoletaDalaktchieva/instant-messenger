const Message = require('../models/message');
const io = require('socket.io')
const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Chat = require('../models/chat');
const user = require('../models/user');

exports.getMessage = function (req, res) {
    const id = req.params.id;
    Message.findById(id, function (error, list_messages) {
        if (error) {
            res.status(500).json({ result: false, message: 'Cannot find such chat!', error: error });
        }
        res.status(200).json({ result: true, message_list: list_messages });
    });
}

exports.sortMessagesByDate = function (req, res) {
    Message.find()
        .sort({ name: 1 })
        .populate('message')
        .exec(function (error, list_messages) {
            if (error) {
                res.status(500).json({ result: false, message: 'Cannot get message list!', error: error });
            }
            res.status(200).json({ result: true, message_list: list_messages });
        })
}

exports.create = function (chatId, userId, text) {
    const message = new Message({
        text: text,
        chat: chatId,
        sender: userId,
        dispatchDate: Date.now(),
    });
    message.save().then(
        (created) => {
            console.log(created);
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    );
}