const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    console.log('Comparing passwords:', password, hashedPassword); // Log the passwords being compared
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
    const payload = { id: user._id, email: user.email, role: user.role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
};
