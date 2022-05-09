const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    room: String,
    name: String,
    message: String,
    time: String
})

const Message = mongoose.model('Message', msgSchema);
module.exports = Message;