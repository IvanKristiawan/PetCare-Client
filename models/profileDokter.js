const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
})

const profileDokterSchema = new Schema({
    images: [ImageSchema],
    email: {type: String},
    nama: {type: String},
    spesialis: {type: String},
    pengalaman: {type: String},
    lulusan: {type: String},
    tempatPraktik: {type: String},
    nomorSTR: {type: String},
    kontak: {type: String},
})

module.exports = mongoose.model('ProfileDokter', profileDokterSchema);