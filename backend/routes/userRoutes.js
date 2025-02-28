require("dotenv").config();
const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const requireAuth = require('../middleware/requireAuth');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find({}).sort({ createdAt: -1 });
//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

router.post('/login', async (req, res) => {
    const { email, password, authLevel } = req.body;

    try {
        const user = await User.login(email, password, authLevel);

        // Generate a JWT token
        const token = createToken(user._id);

        // Send user data along with the token
        res.json({ ...user.toObject(), token });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (not your Gmail password)
    },
});


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Generate reset token with expiry
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10h" });

        // Store token & expiry in database
        user.resetToken = token;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Send reset email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            text: `Click here to reset your password: ${resetLink}`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Password reset link sent to your email." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({ resetToken: token });

        if (!user) {
            console.log("User not found or token invalid");
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateResult = await User.updateOne(
            { email: user.email },
            { $set: { password: hashedPassword, resetToken: null } }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({ message: "Failed to update password" });
        }

        res.json({ message: "Password successfully reset!" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/change-password', requireAuth, async (req, res) => {
    const { current, newPass } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(current, user.password);
        if (!match) return res.status(400).json({ error: "Current password is incorrect" });

        user.password = await bcrypt.hash(newPass, 10);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
