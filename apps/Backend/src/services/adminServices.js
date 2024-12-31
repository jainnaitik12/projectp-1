import asyncHandler from "../utils/asyncHandler";
import userServices from "./userServices";

export default class AdminServices {
  constructor() {
    this.userServices = new userServices();
  }
  verifyandLockUser = asyncHandler(async (userId, adminId) => {
    return await this.userServices.verifyandLockUser(userId, adminId);
  });
  unlockUserProfile = asyncHandler(async (userId, adminId) => {
    return await this.userServices.unlockUserProfile(userId, adminId);
  });
  demoteAdmin = asyncHandler(async (userId) => {
    return await this.userServices.demoteAdmin(userId);
  });
  promoteAdmin = asyncHandler(async (userId, userRoleAsAdmin) => {
    return await this.userServices.promoteAdmin(userId, userRoleAsAdmin);
  });
}