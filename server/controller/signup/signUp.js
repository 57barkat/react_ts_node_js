const User = require('../../model/loginSchema/loginSchema');
const { hashPassword } = require('../../utils/loginUtil/loginUtil');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if all required fields are provided
        if (!name || !email || !password) {
            console.error('Missing required fields:', { name, email, password });
            return res.status(400).send('Name, email, and password are required');
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('Email already registered:', email);
            return res.status(400).send('Email is already registered');
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);  // Log the error for debugging
        res.status(500).send('Error registering user');
    }
};

module.exports = {
    signUp
};
