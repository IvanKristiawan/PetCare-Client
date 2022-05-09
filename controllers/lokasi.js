// Import Models
const Location = require('../models/rsLocation');

module.exports.index = async(req, res) => {
    const locations = await Location.find({});
    let tempLowI = 0;
    let tempUpI = 5;
    res.render('locations/index', {locations, tempLowI, tempUpI});
}

module.exports.showLokasi = async(req, res) => {
    const location = await Location.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    
    var locationFormat =JSON.parse(JSON.stringify(location));
    const locate = locationFormat.geometry.coordinates;
    res.render('locations/show', {location, locate});
}

module.exports.lokasiNext = async(req, res) => {
    const {lowI} = req.body;
    const {upI} = req.body;
    const locations = await Location.find({});
    let tempLowI = parseInt(lowI)+5;
    let tempUpI = parseInt(upI)+5;
    res.render('locations/index', {locations, tempLowI, tempUpI});
}

module.exports.lokasiPrevious = async(req, res) => {
    const {lowI} = req.body;
    const {upI} = req.body;
    const locations = await Location.find({});
    let tempLowI = parseInt(lowI)-5;
    let tempUpI = parseInt(upI)-5;
    res.render('locations/index', {locations, tempLowI, tempUpI});
}