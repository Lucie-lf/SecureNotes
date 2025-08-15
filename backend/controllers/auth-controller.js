import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';

export const signup = (req, res) => {
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

    } catch (error) {
}

export const login = (req, res) => {
    res.send('Login route');
}

export const logout = (req, res) => {
    res.send('Logout route');
}