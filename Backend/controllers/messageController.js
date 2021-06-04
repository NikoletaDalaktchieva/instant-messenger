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

