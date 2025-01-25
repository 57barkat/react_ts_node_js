const User = require('../../model/loginSchema/loginSchema');
const { comparePassword } = require('../../utils/loginUtil/loginUtil');

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
        res.status(200).send('Login successful');
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

module.exports = {
    login
};
