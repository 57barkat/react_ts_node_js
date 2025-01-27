const express = require('express');
const loginRoute = require('./loginRoute/loginRoute');
const manageUsersRoute = require('./manageUsers');
const productsManagementRoute = require('./productsManagement/productsManagement');

const router = express.Router();

router.use('/login', loginRoute);
router.use('/manageUsers', manageUsersRoute);
router.use('/products', productsManagementRoute);

module.exports = router;
