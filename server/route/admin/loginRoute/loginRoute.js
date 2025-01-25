const express = require('express');
const router = express.Router();
const loginController = require('../../../controller/login/login');
const signUpController = require('../../../controller/signup/signUp');
const authController = require('../../../controller/auth/auth');

// ...existing code...

router.post('/login', loginController.login);
router.post('/signup', signUpController.signUp);

// ...existing code...

module.exports = router;
