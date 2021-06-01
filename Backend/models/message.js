const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: { type: String },
    chat: { type: String, required: true },
    sender: { type: String, required: true },
    dispatchDate: { type: Date, required: true },
});

module.exports = mongoose.model('Message', messageSchema);