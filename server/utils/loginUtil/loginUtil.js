const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    if (!password) {
        throw new Error('Password is required');
    }
    console.log('Hashing password:', password); // Log the password being hashed
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
    if (!password || !hashedPassword) {
        throw new Error('Both password and hashedPassword are required');
    }
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};
