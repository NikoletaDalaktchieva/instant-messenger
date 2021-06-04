const mongoose = require('mongoose'), Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    text: { type: String, require: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    //sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: String, required: true },
    dispatchDate: { type: Date, required: true },
});

module.exports = mongoose.model('Message', messageSchema);