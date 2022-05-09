// Require and use Route Express + Joining paramaeter
const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');

// Import Controllers
const review = require('../controllers/reviews');

// Routing
router.post('/', catchAsync(review.uploadReview));
router.delete('/:reviewId', catchAsync(review.deleteReview));

// Exporting
module.exports = router;