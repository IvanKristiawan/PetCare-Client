// Import Models
const Stok = require('../models/stok');
const User = require('../models/user');
const Keranjang = require('../models/keranjang');

module.exports.index = async(req, res) => {
    const stoks = await Stok.find({});
    let tempLowI = 0;
    let tempUpI = 8;
    res.render('ecommerce/index', {stoks, tempLowI, tempUpI});
}

module.exports.searchObat = async(req, res) => {
    let tempLowI = 0;
    let tempUpI = 8;
    const inputObat = new Stok(req.body);
    const tempObat = inputObat.nama.toUpperCase();
    const stoks = await Stok.find({nama:{$regex: tempObat}});
    res.render('ecommerce/index', {stoks, tempLowI, tempUpI});
}

module.exports.showObat = async(req, res) => {
    const userId = req.user._id;
    const stoks = await Stok.find({});
    const {id} = req.params;
    const stok = await Stok.findById(id);
    const user = await User.findById(userId);
    const carts = await Keranjang.find({});
    res.render('ecommerce/show', {stoks, stok, user, carts});
}

module.exports.uploadCart = async(req, res) => {
    const newCart = new Keranjang(req.body);
    await newCart.save();
    res.redirect('/keranjang');
}

module.exports.changeCart = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const {id} = req.params;
    let changeCart = await Keranjang.findOneAndUpdate(
        {stokId: id, userId: {$regex: user._id}},
        req.body,
        {runValidators: true, new: true}
    )
    res.redirect('/keranjang');
}

module.exports.stokNext = async(req, res) => {
    const {lowI} = req.body;
    const {upI} = req.body;
    const stoks = await Stok.find({});
    let tempLowI = parseInt(lowI)+8;
    let tempUpI = parseInt(upI)+8;
    res.render('ecommerce/index', {stoks, tempLowI, tempUpI});
}

module.exports.stokPrevious = async(req, res) => {
    const {lowI} = req.body;
    const {upI} = req.body;
    const stoks = await Stok.find({});
    let tempLowI = parseInt(lowI)-8;
    let tempUpI = parseInt(upI)-8;
    res.render('ecommerce/index', {stoks, tempLowI, tempUpI});
}