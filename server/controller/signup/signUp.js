const crypto = require('crypto');
const User = require('../../model/loginSchema/loginSchema');
const { hashPassword } = require('../../utils/loginUtil/loginUtil');
const nodemailer = require('nodemailer');

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const verificationToken = crypto.randomBytes(20).toString('hex');
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken
        });
        await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: newUser.email,
            from: process.env.EMAIL,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: \n\n
                   http://${req.headers.host}/verify-email/${verificationToken}\n\n`
        };

        await transporter.sendMail(mailOptions);
        res.status(201).send('User registered successfully. Please check your email for verification.');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

module.exports = {
    signUp
};
