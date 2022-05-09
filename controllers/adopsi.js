// Import Models
const Adopsi = require('../models/adopsi');

module.exports.index = async(req, res) => {
    const listAnimal = await Adopsi.find({});
    res.render('adopsi/index', {listAnimal});
}

module.exports.showPage = async(req, res) => {
    const {id} = req.params;
    const animal = await Adopsi.findById(id);
    res.render('adopsi/show', {animal});
}