const mongoose = require('mongoose');
const Message = require('./messages');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room: String,
    name: [
        {type: String}
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        }
    ]
})

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;