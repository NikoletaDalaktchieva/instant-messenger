const mongoose = require('mongoose'), Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    name: { type: String, require: true },
});

module.exports = mongoose.model('Chat', chatSchema);