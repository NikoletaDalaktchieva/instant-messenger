const Chat = require('../models/chat');

exports.getChat = function (req, res) {
    Chat.find({})
        .populate('chat')
        .exec(function(error, list_chats) {
            if(error) {
                res.status(500).json({ result: false, message: "Cannot get chat list", error: error }); 
            }
            res.status(200).json({result: true, chat_list: list_chats} );
        })
}