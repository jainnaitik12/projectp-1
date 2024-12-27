import companyModel from "../models/companyModel.js";
import UserModel from "../models/userModel.js";
import User from "../schema/userSchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class companyServices {
    constructor() {
        this.CompanyModel = new companyModel;
        this.userModel = new UserModel();
    }

    async createCompany(companyData) {
        console.log("Service layer: createCompany called");
        if(!companyData.companyName || !companyData.email || !companyData.website || !companyData.password)
        {
            return new apiResponse(500, null, "Missing required Details");
        }
        const user = {
            email: companyData.email,
            password: companyData.password,
            user_role: "company"
        };
        
        const userData = await this.userModel.createUser(user);
        console.log("User creation response:", userData);
        
        if (!userData.success) {
            return new apiResponse(500, "User creation Failed", userData.message); 
        }
        const response = await this.CompanyModel.createCompany(companyData,userData.data._id);
        console.log("Company creation response:", response);

        if (!response.success) {
            await this.userModel.deleteUser(userData.data._id);
            return new apiResponse(500, "Creation of Company Failed", response.message);
        }

        await User.findByIdAndUpdate(userData.data._id, {
            Company: response.data._id
        });

        return response;
    }

    async updateCompany(id, updates) {
        console.log("Service layer: updateCompany called");
        const response = await this.CompanyModel.updateCompany(id, updates);
        return response;
    }

    async deleteCompany(id) {
        console.log("Service layer: deleteCompany called");
        const response = await this.CompanyModel.deleteCompany(id);
        return response;
    }

    async addJNFToCompany(companyId, jnfData) {
        console.log("Service layer: addJNFToCompany called");
        const response =  await this.CompanyModel.addJNFToCompany(companyId, jnfData);
        return response;
    }

    async getJNFsForCompany(companyId) {
        console.log("Service layer: getJNFsForCompany called");
        const response =  await this.CompanyModel.getJNFsForCompany(companyId);
        return response;
    }
}
