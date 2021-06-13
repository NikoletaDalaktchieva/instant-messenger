const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    name: { type: String, require: true, unique: true },
});

module.exports = mongoose.model('Chat', chatSchema);