// Import Models
const User = require('../models/user');
const ProfileDokter = require('../models/profileDokter');
const {cloudinary} = require('../cloudinary');

module.exports.index = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.render('dokter/index', {user});
}

module.exports.profilePage = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const findProfileDokter = await ProfileDokter.findById(userId);
    // console.log(findProfileDokter);
    res.render('dokter/profile', {user, findProfileDokter});
}

module.exports.akunPage = async(req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);

    const findProfileDokter = await ProfileDokter.findById(userId);
    // console.log(findProfileDokter);
    res.render('dokter/akun', {user, findProfileDokter});
}

module.exports.uploadProfile = async(req, res) => {
    const newProfileDokter = new ProfileDokter(req.body);
    newProfileDokter.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await newProfileDokter.save();
    res.redirect('/dokter');
}

module.exports.editProfile = async(req, res) => {
    const userId = req.user._id;
    const findProfileDokter = await ProfileDokter.findByIdAndUpdate(userId, req.body, {runValidators: true, new: true});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    findProfileDokter.images.push(...imgs);
    await findProfileDokter.save();
    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await findProfileDokter.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    res.redirect(`/dokter/profile`);
}