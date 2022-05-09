const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');

// Import Controllers
const dokter = require('../controllers/dokter');

// Import Models
const ProfileDokter = require('../models/profileDokter');
const User = require('../models/user');
const Message = require('../models/messages');
const Room = require('../models/rooms');

// Require Multer for Img Upload
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

// Routing Dokter
router.get('/', isLoggedIn, catchAsync(dokter.index));
router.route('/profile')
    .get(isLoggedIn, dokter.profilePage)
    .post(upload.array('image'), catchAsync(dokter.uploadProfile))
    .put(upload.array('image'), catchAsync(dokter.editProfile));
router.get('/akun', isLoggedIn, dokter.akunPage);

router.get('/rooms', isLoggedIn, async(req, res) => {
    let customerName = '';
    const userId = req.user._id;
    const user = await User.findById(userId);
    const findAllRoom = await Room.find({name: user.username});
    for(let room of findAllRoom){
        for(let name of room.name){
            if(name != user.username){
                customerName = name;
            }
        }
    }
    const customer = await User.findOne({username: customerName});
    res.render('dokter/rooms', {findAllRoom, user, customer});
})

module.exports = router;