const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');

// Import Controllers
const beliObat = require('../controllers/beliObat');

// Routing 
router.get('/', catchAsync(beliObat.index));
router.post('/search', catchAsync(beliObat.searchObat));
router.post('/next', catchAsync(beliObat.stokNext));
router.post('/previous', catchAsync(beliObat.stokPrevious));
router.route('/:id')
    .get(isLoggedIn, catchAsync(beliObat.showObat))
    .post(catchAsync(beliObat.uploadCart))
    .put(catchAsync(beliObat.changeCart));

module.exports = router;