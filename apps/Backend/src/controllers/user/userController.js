import User from "../../schema/userSchema.js";
import userModel from "../../models/userModel.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import jwt from 'jsonwebtoken';

class userController {
    constructor() {
        this.UserModel = new userModel();
    }

    async createUser(req, res) {
        const { email, password, user_role, avatar, superadmin, tpo, pcc } = req.body;
        try {
            const response = await this.UserModel.createUser({
                email, password, user_role, avatar, superadmin, tpo, pcc
            });
            if (!response) {
                return res.status(500).json(new apiError(500, "User not created"));
            }
            return res.status(200).json(new apiResponse(200, response.data, "User created successfully"));
        } catch (error) {
            return res.status(500).json(new apiError(500, error.message, [error.stack]));
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const { user, token } = await this.UserModel.authenticateUser(email, password);
            const refreshToken = user.generateRefreshToken();
            user.refreshToken = refreshToken;
            await user.save();
            return res.status(200).json(new apiResponse(200, { user, token, refreshToken }, "User logged in successfully"));
        } catch (error) {
            return res.status(401).json(new apiError(401, error.message, [error.stack]));
        }
    }

    async logoutUser(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });
            const options = { httpOnly: true, secure: true };
            return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new apiResponse(200, null, "User logged out"));
        } catch (error) {
            return res.status(500).json(new apiError(500, error.message, [error.stack]));
        }
    }

    async refreshAccessToken(req, res) {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new apiError(401, "Unauthorized request");
        }
        try {
            const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findById(decodedToken?._id);
            if (!user || incomingRefreshToken !== user?.refreshToken) {
                throw new apiError(401, "Invalid refresh token");
            }
            const options = { httpOnly: true, secure: true };
            const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);
            return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(new apiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
        } catch (error) {
            throw new apiError(401, error?.message || "Invalid refresh token");
        }
    }

    async changeCurrentPassword(req, res, next) {
        try {
            const { oldPassword, newPassword } = req.body;
            const user = await User.findById(req.user?._id);
            const isPasswordCorrect = await user.comparePasswords(oldPassword);
            if (!isPasswordCorrect) {
                throw new apiError(400, "Invalid old password");
            }
            user.password = newPassword;
            await user.save({ validateBeforeSave: false });
            return res.status(200).json(new apiResponse(200, {}, "Password changed successfully"));
        } catch (error) {
            next(error);
        }
    }

    async getCurrentUser(req, res) {
        return res.status(200).json(new apiResponse(200, req.user, "Current user fetched successfully"));
    }

    async updateUserProfile(req, res) {
        const { fullname, email } = req.body;
        if (!(fullname || email)) {
            throw new apiError(400, "Fullname or email is required");
        }
        try {
            const response = await this.UserModel.updateUser(req.user._id, { fullname, email });
            return res.status(200).json(new apiResponse(200, response.data, "Profile updated successfully"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new apiError(error.statusCode || 500, error.message, [error.stack]));
        }
    }

    async updateUserAvatar(req, res) {
        const avatarLocalPath = req.file?.path;
        if (!avatarLocalPath) {
            throw new apiError(400, "Avatar file is missing");
        }
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar.url) {
            throw new apiError(400, "Error while uploading avatar");
        }
        try {
            const response = await this.UserModel.updateUser(req.user._id, { avatar: avatar.url });
            return res.status(200).json(new apiResponse(200, response.data, "Avatar updated successfully"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new apiError(error.statusCode || 500, error.message, [error.stack]));
        }
    }

    async assignStudentsToPCC(req, res) {
        const { pccId, studentIds } = req.body;
        try {
            const response = await this.UserModel.assignStudentsToPCC(pccId, studentIds);
            return res.status(200).json(new apiResponse(200, response.data, "Students assigned to PCC successfully"));
        } catch (error) {
            return res.status(error.statusCode || 500).json(new apiError(error.statusCode || 500, error.message, [error.stack]));
        }
    }
}

export default userController;