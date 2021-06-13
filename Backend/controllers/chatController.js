const Chat = require('../models/chatSchema');

exports.getChat = function (req, res) {
    Chat.find({})
        .populate('chat')
        .exec(function (error, list_chats) {
            if (error) {
                return res.status(500).json({ result: false, message: 'Cannot get chat list', error: error });
            }
            res.status(200).json({ result: true, chat_list: list_chats });
        })
}

exports.create = function (req, res) {
    const chat = new Chat({
        name: req.body.name,
    });
    chat.save().then(
        (createdChat) => {
            res.status(200).json({ result: true, chat: createdChat });
        }
    ).catch(
        (error) => {
            if (error.name === 'MongoError' && error.code === 11000) {
                return res.status(422).send({ result: false, message: ' Chat already exist!' });
            }
            res.status(400).json({ result: false, message: 'Cannot create this chat', error: error });
        }
    );
}