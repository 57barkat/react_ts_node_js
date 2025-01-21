const express = require('express');
const router = express.Router();
const loginRoute = require('./loginRoute/loginRoute');

// ...existing code...

router.use('/auth', loginRoute);

// ...existing code...

module.exports = router;
