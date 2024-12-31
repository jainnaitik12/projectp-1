import Admin from "../schema/adminSchema";
import User from "../schema/userSchema";
import apiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler.js"
export default class adminModel {
    admin = Admin;

    editAdmin = asyncHandler(async (adminData, id) => {
        const { updates } = adminData;
        const updatedAdmin = await this.admin.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedAdmin) {
            return apiResponse(404, "Admin not found");
        }
        return apiResponse(200, "Admin updated successfully", updatedAdmin);
    })

    createAdmin = asyncHandler(async (adminData, id) => {
        try {
            const {permissions} = adminData;
            const newAdmin = await this.admin.create({
                userid: id,
                permissions: permissions,
            });

            return apiResponse(200, "Admin created successfully", newAdmin);
        } catch (error) {
            return apiResponse(500, "An error occurred while creating admin", { error: error.message });
        }
    })

    deleteAdminById = asyncHandler(async (id) => {
        const deletedAdmin = await this.admin.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return apiResponse(404, "Admin not found");
        }
        return apiResponse(200, "Admin deleted successfully");
    })

}