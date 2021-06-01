const Message = require('../models/message');

exports.getMessage = function (req, res) {
    Message.find({})
        .populate('message')
        .exec(function(error, list_messages) {
            if(error) {
                res.status(500).json({ result: false, message: "Cannot get message list", error: error }); 
            }
            res.status(200).json({result: true, message_list: list_messages} );
        })
}