const User = require('../../model/loginSchema/loginSchema');
const { comparePassword, generateToken } = require('../../utils/loginUtil/loginUtil');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('Login attempt for email:', email); // Log the email attempting to login
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email); // Log if user is not found
            return res.status(400).send('Invalid email or password');
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch for email:', email); // Log if password does not match
            return res.status(400).send('Invalid email or password');
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
        console.error('Error logging in:', error); // Log any errors that occur
        res.status(500).send('Error logging in');
    }
};

module.exports = {
    login
};
