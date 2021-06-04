const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    name: { type: String, require: true },
});

module.exports = mongoose.model('Chat', chatSchema);