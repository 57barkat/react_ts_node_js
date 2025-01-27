const express = require('express');
const { getAllUsers, updateUser, deleteUser, updateUserRole } = require('../../../controller/manageUsers');
const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Update user details
router.put('/update/:id', updateUser);

// Delete user
router.delete('/delete/:id', deleteUser);

// Update user role
router.put('/updateRole/:id', updateUserRole);

module.exports = router;
