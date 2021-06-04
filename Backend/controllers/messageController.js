const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Message = require('../models/messageSchema');
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

exports.create = function (chatId, tokenId, text, io, roomId) {
    const token = jwt_decode(tokenId);
    const message = new Message({
        text: text,
        chat: chatId,
        sender: token.name,
        dispatchDate: Date.now(),
    });
    message.save().then(
        (created) => {
            console.log(created)
            io.emit('message', roomId, created);
        }
    ).catch(
        (error) => {
            
            console.log(error)
            return error;
        }
    );
}
