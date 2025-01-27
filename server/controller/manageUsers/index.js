const { getAllUsers, updateUser, deleteUser, updateUserRole } = require('../../utils/manageUsers');

// Controller to get all users
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};

// Controller to update user details
const updateUserController = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
        const updatedUser = await updateUser(userId, updateData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
};

// Controller to delete user
const deleteUserController = async (req, res) => {
    const userId = req.params.id;
    try {
        await deleteUser(userId);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
};

// Controller to update user role
const updateUserRoleController = async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;
    try {
        const updatedUser = await updateUserRole(userId, role);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).send('Error updating user role');
    }
};

module.exports = {
    getAllUsers: getAllUsersController,
    updateUser: updateUserController,
    deleteUser: deleteUserController,
    updateUserRole: updateUserRoleController
};
