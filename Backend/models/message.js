const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
	text: {type: String},
	chat: {type: Chat, required: true},
	sender: {type: User, required: true},
	dispatchDate: {type: Date, required: true},
});

module.exports = mongoose.model('Message', messageSchema);