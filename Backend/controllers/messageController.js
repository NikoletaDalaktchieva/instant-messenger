const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');
const jwt_decode = require('jwt-decode');

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
    const sortDate = { dispatchDate: 1 }
    Message.find({ 'chat': req.query.chatId })
        .sort(sortDate)
        .populate('sender')
        .exec(function (error, messages) {
            if (error) {
                res.status(500).json({ result: false, message: 'Cannot get message list!', error: error });
            }
            res.status(200).json({ result: true, message_list: compact_list(messages) });
        })
}

const compact_list = function (messages) {
    compact = [];
    messages.forEach(msg => compact.push({
        text: msg.text,
        sender: msg.sender.name,
        dispatchDate: msg.dispatchDate
    }));
    return compact;
}

exports.create = function (chatId, tokenId, text, io) {
    const token = jwt_decode(tokenId);
    const message = new Message({
        text: text,
        chat: chatId,
        sender: token.id,
        dispatchDate: Date.now(),
    });
    message.save().then(
        (created) => {
            io.to(chatId).emit('message', created);
        }
    ).catch(
        (error) => {
            console.log(error)
            return error;
        }
    );
}
