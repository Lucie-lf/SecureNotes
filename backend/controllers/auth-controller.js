import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateJWTToken } from '../utils/generateJWTToken.js';
import { sendVerificationEmail, sendWelcomeEmail } from '../resend/email.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const userAlreadyExists = await User.findOne ({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken : verificationToken,
            verificationExpiresAt: Date.now() + (3600000 * 24) // 1 day expiration
        });

        await user.save();

        generateJWTToken(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined, // Exclude password from response
            }
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: error.message 
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const isVerified = user.isVerified;
        if (!isVerified) {
            return res.status(400).json({ success: false, message: 'Email not verified' });
        }

        generateJWTToken(res, user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
        });

    } catch (error) {
        console.log("Error during login:", error);
        res.status(400).json({ 
            success: false,
            message: 'Login failed' 
        });
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logout successful',
    });
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationExpiresAt: { $gt: Date.now() }, // Check if token is still valid
        })
        if (!user) {
            return res
            .status(400)
            .json({ 
                success: false,
                message: 'Invalid or expired verification token' 
            });
        }
        console.log("User found:", user);
        // Mark user as verified
        user.isVerified = true;
        user.verificationToken = undefined; // Clear the token after verification
        user.verificationExpiresAt = undefined; // Clear the expiration date
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success: true,
            message: 'Email verified successfully',
        });
    } catch (error) {
        console.log("Error verifying email:", error);
        res.status(400).json({ 
            success: false,
            message: 'Failed to verify email' 
        });
    }
}

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user){
            return res.status(400).json({ success: false, message: "User not found"});
        }
        res.status(200).json({success: true, user: {...user._doc, password: undefined}});
    } catch (error) {
        console.log("error checking auth", error);
        res.status(400).json({success: false, message: error.message});
    }
}