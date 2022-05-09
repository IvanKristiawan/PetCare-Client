// Import Models
const User = require('../models/user');
const Keranjang = require('../models/keranjang');

module.exports.index = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const carts = await Keranjang.find({userId: {$regex: user._id}});
    
    let totalPrice = 0;
    for(let cart of carts){
        let price = parseInt(cart.hargaJual);
        let quantity = parseInt(cart.quantity);
        totalPrice = totalPrice + (price * quantity);
    }

    for(let cart of carts){
        if(cart.quantity < 1){
            const deletedCart = await Keranjang.deleteOne({_id: cart._id});
        }
    }

    res.render('ecommerce/keranjang', {carts, totalPrice});
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