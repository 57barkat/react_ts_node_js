const express = require('express');
const router = express.Router();
const loginController = require('../../../controller/login/login');
const signUpController = require('../../../controller/signup/signUp');
const authController = require('../../../controller/auth/auth');

// ...existing code...

router.post('/login', loginController.login);
router.post('/signup', signUpController.signUp);
router.post('/reset-password', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// ...existing code...

module.exports = router;
