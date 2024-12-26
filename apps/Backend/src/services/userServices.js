import userModel from "../models/userModel.js";

class userServices {
    constructor() {
        this.UserModel = new userModel;
    }

    async createUser(userData) {
        const response = await this.UserModel.createUser(userData);
        return response;
    }
    async authenticateUser(email, password) {
        const user = await this.UserModel.findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await user.comparePasswords(password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        const token = user.generateAccessToken();
        return { user, token };
    }

    // async updateUser(userId, updateData) {
    //     const response = await this.UserModel.updateUser(userId, updateData);
    //     return response;
    // }

    // async assignStudentsToPCC(pccId, studentIds) {
    //     const response = await this.UserModel.assignStudentsToPCC(pccId, studentIds);
    //     return response;
    // }
}

export default userServices;
