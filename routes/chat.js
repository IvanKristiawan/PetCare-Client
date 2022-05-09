const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');

// Import Controllers
const chat = require('../controllers/chat');

// Routing
router.route('/')
    .get(isLoggedIn, chat.index)
    .post(catchAsync(chat.newChat));
router.get('/rooms', isLoggedIn, chat.roomsPage);
router.post('/rooms/search', isLoggedIn, catchAsync(chat.searchRooms));
router.route('/rooms/:roomId')
    .get(isLoggedIn, catchAsync(chat.chatPage))
    .post(catchAsync(chat.sendMessage));
router.post('/search', catchAsync(chat.searchDokter));

module.exports = router;