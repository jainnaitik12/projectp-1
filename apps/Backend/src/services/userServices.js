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
}

export default userServices;
