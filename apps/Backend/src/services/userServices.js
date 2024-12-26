import UserModel from "../models/userModel.js";

class userServices {
    constructor() {
        this.userModel = new UserModel();
    }

    async createUser(userData) {
        const response = await this.userModel.createUser(userData);
        return response;
    }
    async deleteUserById(userId){
        const response = await this.userModel.deleteUserById(userId);
        return response;
    }
    async addStudentIdToUser(userId,studentId){
        const response = await this.userModel.addStudentIdToUser(userId,studentId);
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
