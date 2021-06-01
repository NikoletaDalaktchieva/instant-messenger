const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    name: { type: String },
});

module.exports = mongoose.model('Chat', chatSchema);