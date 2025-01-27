const User = require('../../model/loginSchema/loginSchema');

// Get all users
const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

// Update user details
const updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user: ' + error.message);
    }
};

// Delete user
const deleteUser = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

// Update user role
const updateUserRole = async (userId, role) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user role: ' + error.message);
    }
};

module.exports = {
    getAllUsers,
    updateUser,
    deleteUser,
    updateUserRole
};
