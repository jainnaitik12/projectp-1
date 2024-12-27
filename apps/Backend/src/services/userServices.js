import userModel from "../models/userModel.js";
import apiResponse from "../utils/apiResponse.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendVerificationEmail from "../utils/sendVerificationEmail.js";
export default class userServices {
    constructor() {
        this.userModel = new userModel();
    }

    async registerUser(userData) {
        try {
            if (!userData.email || !userData.password || !userData.user_role) {
                return new apiResponse(400, null, "Missing required fields");
            }

            const user = await this.userModel.createUser(userData);
            if (user.statusCode !== 201) {
                return user;
            }

            // const verificationToken = crypto.randomBytes(32).toString('hex');
            // const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

            // await this.userModel.updateUser(user.data._id, {
            //     verificationToken,
            //     verificationTokenExpiry
            // });

            // Send verification email here
            // await sendVerificationEmail(userData.email, verificationToken);

            const authToken = user.data.generateAccessToken();
            const refreshToken = user.data.generateRefreshToken();
            await this.userModel.updateTokens(user.data._id, authToken, refreshToken);

            
            return new apiResponse(201, {
                    user: user.data,
                    authToken,
                    refreshToken
                }, "User registered successfully. Please verify your email.");
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async loginUser(email, password) {
        try {
            const user = await this.userModel.findUserByEmail(email);
            if (user.statusCode !== 200) {
                return new apiResponse(401, null, "Invalid credentials");
            }

            const isPasswordValid = await user.data.comparePasswords(password);
            if (!isPasswordValid) {
                return new apiResponse(401, null, "Invalid credentials");
            }

            if (!user.data.isVerified) {
                return new apiResponse(403, null, "Please verify your email first");
            }

            const authToken = user.data.generateAccessToken();
            const refreshToken = user.data.generateRefreshToken();
            await this.userModel.updateTokens(user.data._id, authToken, refreshToken);

            user.data.password = undefined;

            return new apiResponse(200, {
                user: user.data,
                authToken,
                refreshToken
            }, "Login successful");
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async refreshToken(refreshToken) {
        try {
            if (!refreshToken) {
                return new apiResponse(401, null, "Refresh token is required");
            }

            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await this.userModel.findUserById(decoded._id);

            if (user.statusCode !== 200 || user.data.refreshToken !== refreshToken) {
                return new apiResponse(401, null, "Invalid refresh token");
            }

            const newAuthToken = user.data.generateAccessToken();
            const newRefreshToken = user.data.generateRefreshToken();
            await this.userModel.updateTokens(user.data._id, newAuthToken, newRefreshToken);

            return new apiResponse(200, {
                authToken: newAuthToken,
                refreshToken: newRefreshToken
            }, "Tokens refreshed successfully");
        } catch (error) {
            return new apiResponse(401, null, "Invalid refresh token");
        }
    }

    async logoutUser(userId) {
        try {
            return await this.userModel.clearTokens(userId);
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async getCurrentUser(userId) {
        try {
            return await this.userModel.findUserById(userId);
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async forgotPassword(email) {
        try {
            const user = await this.userModel.findUserByEmail(email);
            if (user.statusCode !== 200) {
                return new apiResponse(404, null, "User not found");
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = Date.now() + 30 * 60 * 1000;

            await this.userModel.updateUser(user.data._id, {
                resetPasswordToken: resetToken,
                resetPasswordExpiry: resetTokenExpiry
            });

            return new apiResponse(200, { resetToken }, "Password reset token generated");
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async resetPassword(resetToken, newPassword) {
        try {
            const user = await this.userModel.findOne({
                resetPasswordToken: resetToken,
                resetPasswordExpiry: { $gt: Date.now() }
            });

            if (!user) {
                return new apiResponse(400, null, "Invalid or expired reset token");
            }

            const result = await this.userModel.updatePassword(user._id, newPassword);
            if (result.statusCode === 200) {
                await this.userModel.updateUser(user._id, {
                    resetPasswordToken: undefined,
                    resetPasswordExpiry: undefined
                });
            }

            return result;
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async updateProfile(userId, updateData) {
        try {
            return await this.userModel.updateUser(userId, updateData);
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async verifyEmail(userId) {
        try {
            return await this.userModel.verifyEmail(userId);
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }
}