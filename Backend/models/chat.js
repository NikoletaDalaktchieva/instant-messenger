const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    _id: Object,
    name: { type: String, require: true },
});

module.exports = mongoose.model('Chat', chatSchema);