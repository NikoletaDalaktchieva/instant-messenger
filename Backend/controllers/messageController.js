const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Message = require('../models/messageSchema');

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
    console.log('Here:', req.query.chatId);
    const sortDate = { dispatchDate: 1 }
    Message.find({ 'chat': req.query.chatId })
        .sort(sortDate)
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
