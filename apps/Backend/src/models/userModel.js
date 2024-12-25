import User from "../schema/userSchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class userModel {
    user = User
    async createUser(userData) {
        console.log('User Model: createUser called');
        const { email, password, user_role, avatar, superadmin, pcc, admin } = userData;
        try {
            const createdUser = await this.user.create({
                email: email,
                password: password,
                user_role: user_role,
                avatar: avatar,
                superadmin: superadmin,
                pcc: pcc,
                admin: admin
            })
            return new apiResponse(200, "User created successfully", createdUser);
        } catch (error) {
            return new apiResponse(500, "Internal server error");
        }
    }
    
}