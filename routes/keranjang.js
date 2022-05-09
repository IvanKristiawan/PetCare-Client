const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');

// Import Controllers
const keranjang = require('../controllers/keranjang');

// Routing
router.get('/', isLoggedIn, keranjang.index);
router.put('/:id', isLoggedIn, catchAsync(keranjang.changeCart));

module.exports = router;