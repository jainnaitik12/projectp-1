import apiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import authVerify from "./auth.middlewares";

const adminVerify = asyncHandler((req, res, next) => {
    const admin = req.user.user_role === "admin";
    if (admin) {
        req.adminRole = req.user.userRoleAsAdmin;
        next();
    } else {
        throw new apiResponse(403, null, "Access denied");
    }
});

export default adminVerify;
