const express = require('express');
const loginRoute = require('./loginRoute/loginRoute');
const manageUsersRoute = require('./manageUsers');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/manageUsers', manageUsersRoute);

module.exports = router;
