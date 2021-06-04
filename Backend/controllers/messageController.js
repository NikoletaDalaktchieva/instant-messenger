const Message = require('../models/message');

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
    Message.find()
        .sort(sortDate)
        .populate('message')
        .exec(function (error, list_messages) {
            if (error) {
                res.status(500).json({ result: false, message: 'Cannot get message list!', error: error });
            }
            res.status(200).json({ result: true, message_list: list_messages });
        })
}