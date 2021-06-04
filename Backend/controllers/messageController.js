const Message = require('../models/messageSchema');

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
