import asyncHandler from "../../utils/asyncHandler.js"
import AdminServices from "../../services/adminServices.js";
import apiResponse from "../../utils/apiResponse.js";
export default class AdminController {
    constructor() {
        this.adminServices = new AdminServices();
    };
    verifyandLockUser = asyncHandler(async (req, res) => {
        const { userId, adminId } = req.body;
        const verifiedUser = this.adminServices.verifyandLockUser(userId, adminId);
        res
            .status(200)
            .json(new apiResponse(200, verifiedUser.data, verifiedUser.message));
    });

    unlockUserProfile = asyncHandler(async (req, res) => {
        const { userId, adminId } = req.body;
        const unlockedUser = this.adminServices.unlockUserProfile(userId, adminId);
        res
            .status(200)
            .json(new apiResponse(200, unlockedUser.data, unlockedUser.message));
    });
    demoteAdmin = asyncHandler(async (req, res) => {
        const { userId } = req.body;
        const demotedUser = this.adminServices.demoteAdmin(userId);
        res
            .status(200)
            .json(new apiResponse(200, demotedUser.data, demotedUser.message));
    });

    promoteAdmin = asyncHandler(async (req, res) => {
        const { userId, userRoleAsAdmin } = req.body;
        const promotedUser = this.adminServices.promoteAdmin(userId, userRoleAsAdmin);
        res
            .status(200)
            .json(new apiResponse(200, promotedUser.data, promotedUser.message));
    });
    
}

