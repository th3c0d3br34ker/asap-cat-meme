const express = require('express');

const router = express.Router();

router.use('/memes', require('./memes'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

module.exports = router;
