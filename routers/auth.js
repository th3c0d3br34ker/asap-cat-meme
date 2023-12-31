const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/verify', authController.verify);

module.exports = router; 
