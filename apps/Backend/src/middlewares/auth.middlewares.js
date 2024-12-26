import jwt from 'jsonwebtoken';
import User from '../schema/userSchema.js';
import apiError from '../utils/apiError.js';



export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
        return next(new apiError(401, 'Not authorized to access this route'));
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (err) {
        return next(new apiError(401, 'Not authorized to access this route'));
    }
};