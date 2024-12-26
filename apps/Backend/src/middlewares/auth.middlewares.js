import jwt from 'jsonwebtoken';
import User from '../schema/userSchema.js';
import apiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const auth = asyncHandler(async (req, res, next) => {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res
            .status(401)
            .json(new apiResponse(401, null, "Authorization token is required"));
    }

    try {
        // Get token from Bearer token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user by id and exclude password
        const user = await User.findById(decoded._id)
            .select('-password')
            .populate('Student')
            .populate('Company');

        if (!user) {
            return res
                .status(401)
                .json(new apiResponse(401, null, "User not found"));
        }

        // Verify if token matches stored token
        if (token !== user.authToken) {
            return res
                .status(401)
                .json(new apiResponse(401, null, "Token is invalid or has expired"));
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res
                .status(401)
                .json(new apiResponse(401, null, "Invalid token"));
        }
        if (error.name === 'TokenExpiredError') {
            return res
                .status(401)
                .json(new apiResponse(401, null, "Token has expired"));
        }
        return res
            .status(500)
            .json(new apiResponse(500, null, "Authentication failed"));
    }
});

// Middleware for checking specific roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.user_role)) {
            return res
                .status(403)
                .json(new apiResponse(
                    403, 
                    null, 
                    `Role: ${req.user.user_role} is not allowed to access this resource`
                ));
        }
        next();
    };
};

// Middleware to check if user is verified
export const requireVerified = (req, res, next) => {
    if (!req.user.isVerified) {
        return res
            .status(403)
            .json(new apiResponse(403, null, "Please verify your email first"));
    }
    next();
};

// Middleware to check superadmin status
export const requireSuperAdmin = (req, res, next) => {
    if (!req.user.superadmin) {
        return res
            .status(403)
            .json(new apiResponse(403, null, "Superadmin access required"));
    }
    next();
};

// Middleware to check TPO status
export const requireTPO = (req, res, next) => {
    if (!req.user.tpo) {
        return res
            .status(403)
            .json(new apiResponse(403, null, "TPO access required"));
    }
    next();
};

// Middleware to check PCC status
export const requirePCC = (req, res, next) => {
    if (!req.user.pcc) {
        return res
            .status(403)
            .json(new apiResponse(403, null, "PCC access required"));
    }
    next();
};

export default auth;