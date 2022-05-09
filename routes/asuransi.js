const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render('asuransi/index');
})

module.exports = router;