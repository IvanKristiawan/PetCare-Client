const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Keranjang = require('./keranjang');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {type: String, required: true},
    isDokter: {type: Boolean, default: false},
    keranjang: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Keranjang',
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);