const crypto = require('crypto');
const User = require('../../model/loginSchema/loginSchema');
const { hashPassword } = require('../../utils/loginUtil/loginUtil');
const nodemailer = require('nodemailer');

const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).send('Invalid token');
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).send('Email verified successfully');
    } catch (error) {
        res.status(500).send('Error verifying email');
    }
};

const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   http://${req.headers.host}/reset/${token}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Password reset email sent');
    } catch (error) {
        res.status(500).send('Error resetting password');
    }
};

module.exports = {
    resetPassword,
    verifyEmail
};
