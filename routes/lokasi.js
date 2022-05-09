const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

// Import Controllers
const lokasi = require('../controllers/lokasi');

// Routing
router.get('/', catchAsync(lokasi.index));
router.get('/:id', catchAsync(lokasi.showLokasi));
router.post('/next', catchAsync(lokasi.lokasiNext));
router.post('/previous', catchAsync(lokasi.lokasiPrevious));

module.exports = router;