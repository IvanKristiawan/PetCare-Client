const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        url: String,
        filename: String
    }
);

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = {toJSON: {virtuals: true}};

const RsLocationSchema = new Schema({
    title: String,
    images: [ImageSchema],
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts)

RsLocationSchema.virtual('properties.popUpMarkup').get(function(){
    return `
    <strong><a href="/lokasi/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p>`
});

module.exports = mongoose.model('RsLocation', RsLocationSchema);