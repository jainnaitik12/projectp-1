import asyncHandler from "../../utils/asyncHandler.js";
import UserService from "../../services/userServices.js";
import apiResponse from "../../utils/apiResponse.js";

export default class userController {
    constructor() {
        this.userService = new UserService();
    }

    register = asyncHandler(async (req, res) => {
        console.log("Request Body:", req.body);
        const user = await this.userService.registerUser(req.body);
        res.status(200).json(new apiResponse(user.statusCode, user.data, user.message));
    });

    verifyEmailByToken = asyncHandler(async (req, res) => {
        const { token } = req.body;
        const result = await this.userService.verifyEmailByToken(token);
        res.status(result.statusCode).json(result);
    });
    
    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const result = await this.userService.loginUser(email, password);
        res.status(result.statusCode).json(result);
    });

    logout = asyncHandler(async (req, res) => {
        const result = await this.userService.logoutUser(req.user._id);
        res.status(result.statusCode).json(result);
    });

    refreshToken = asyncHandler(async (req, res) => {
        const result = await this.userService.refreshToken(req.body.refreshToken);
        res.status(result.statusCode).json(result);
    });

    getCurrentUser = asyncHandler(async (req, res) => {
        const result = await this.userService.getCurrentUser(req.user._id);
        res.status(result.statusCode).json(result);
    });

    forgotPassword = asyncHandler(async (req, res) => {
        const result = await this.userService.forgotPassword(req.body.email);
        res.status(result.statusCode).json(result);
    });

    resetPassword = asyncHandler(async (req, res) => {
        const { resetToken, newPassword } = req.body;
        const result = await this.userService.resetPassword(resetToken, newPassword);
        res.status(result.statusCode).json(result);
    });

    updateProfile = asyncHandler(async (req, res) => {
        const result = await this.userService.updateProfile(req.user._id, req.body);
        res.status(result.statusCode).json(result);
    });

    verifyEmail = asyncHandler(async (req, res) => {
        const result = await this.userService.verifyEmail(req.user._id);
        res.status(result.statusCode).json(result);
    });
}