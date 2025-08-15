import jwt from 'jsonwebtoken';

export const generateJWTToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { 
        expiresIn: '7d' 
    })

    res.cookie('token', token, {
        httpOnly: true, // les cookies ne sont pas accessibles via les scripts coté client
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
}