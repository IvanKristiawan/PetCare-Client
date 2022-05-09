const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

// Import Controllers
const adopsi = require('../controllers/adopsi');

// Routing
router.get('/', adopsi.index);
router.get('/:id', catchAsync(adopsi.showPage));

module.exports = router;