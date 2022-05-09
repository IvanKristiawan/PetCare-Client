const mongoose = require('mongoose');
const Stok = require('./stok');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    stokId: {type: String},
    userId: {type: String},
    image: {type: String},
    quantity: {type: Number},
    nama: {type: String},
    namaSatuan: {type: String},
    resepDokter: {type: String},
    hargaJual: {type: Number},
    stoks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Stok',
        }
    ]
})

module.exports = mongoose.model('Keranjang', CartSchema);