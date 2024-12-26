import Admin from "../schema/adminSchema";
import User from "../schema/userSchema";
import apiResponse from "../utils/apiResponse";

export default class adminModel {
    admin = Admin;
    //done
    async editAdmin(adminData, id) {
        try {
            const { updates } = adminData;
            const updatedAdmin = await this.admin.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedAdmin) {
                return apiResponse(404, "Admin not found");
            }
            return apiResponse(200, "Admin updated successfully", updatedAdmin);
        } catch (error) {
            return apiResponse(500, "An error occurred while updating admin", { error: error.message });
        }
    }
    //done

    async createAdmin(adminData, id) {
        
        try {
            const { permissions, userData } = adminData;

            const newAdmin = await this.admin.create({
                userid: id,
                permissions: permissions,
            });

            return apiResponse(200, "Admin created successfully", newAdmin);
        } catch (error) {
            return apiResponse(500, "An error occurred while creating admin", { error: error.message });
        }
    }
    //done
    async deleteAdminById(id) {
        try {
            const deletedAdmin = await this.admin.findByIdAndDelete(id);
            if (!deletedAdmin) {
                return apiResponse(404, "Admin not found");
            }
            return apiResponse(200, "Admin deleted successfully");
        } catch (error) {
            return apiResponse(500, "An error occurred while deleting admin", { error: error.message });
        }
    }
}