const User = require('../../model/loginSchema/loginSchema');
const { comparePassword } = require('../../utils/loginUtil/loginUtil');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Error logging in user');
    }
};

module.exports = {
    login
};
