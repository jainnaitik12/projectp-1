import User from "../schema/userSchema.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

class userModel {
    user = User;
    async createUser(userData) {
          const existingUser = await this.user.findOne({ email: userData.email });
            if (existingUser) {
                return new apiResponse(409, null, "Email already exists");
            }
        const { email, password, user_role, avatar, superadmin, tpo, pcc } = userData;
        try {
            const createdUser = await User.create({
                email,
                password,
                user_role,
                avatar,
                superadmin,
                tpo,
                pcc
            });
            return new apiResponse(201, createdUser, "User created successfully");
        } catch (error) {
            throw new apiError(500, "Internal server error", [error.message]);
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email }).select('+password');
            return user;
        } catch (error) {
            throw new apiError(500, "Error finding user by email", [error.message]);
        }
    }
    async updateUser(userId, updateData) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new apiError(404, "User not found");
            }
            if (user.accountLocked) {
                // Allow only certain fields to be updated if the account is locked
                const allowedUpdates = ['avatar', 'password'];
                const updates = Object.keys(updateData);
                const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
                if (!isValidUpdate) {
                    throw new apiError(403, "Account details are locked and cannot be updated");
                }
            }
            Object.assign(user, updateData);
            await user.save();
            return new apiResponse(200, user, "User updated successfully");
        } catch (error) {
            throw new apiError(500, "Error updating user", [error.message]);
        }
    }
    async deleteUserById(userId){
    try {
        const deletedUser  = await this.user.findByIdAndDelete(userId);
        if (!deletedUser) {
                return apiResponse(404,null, "User not found");
            }
        return new apiResponse(200,null,"User deleted successfully");
    } catch (error) {
        return new apiResponse(500,null,error.message);
    }
    
   }

    // async assignStudentsToPCC(pccId, studentIds) {
    //     try {
    //         const pccUser = await User.findById(pccId);
    //         if (!pccUser || pccUser.user_role !== 'student' || !pccUser.pcc) {
    //             throw new apiError(404, "PCC user not found or not valid");
    //         }
    //         pccUser.pccAssignedStudents = studentIds;
    //         await pccUser.save();
    //         return new apiResponse(200, pccUser, "Students assigned to PCC successfully");
    //     } catch (error) {
    //         throw new apiError(500, "Error assigning students to PCC", [error.message]);
    //     }
    // }

}

export default userModel;