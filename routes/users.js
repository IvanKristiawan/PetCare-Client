const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

// Import Controllers
const user = require('../controllers/user');

// Routing
router.route('/daftar')
    .get(user.indexRegister)
    .post(catchAsync(user.register));
router.route('/login')
    .get(user.indexLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), user.login);
router.get('/logout', user.logout);

module.exports = router;