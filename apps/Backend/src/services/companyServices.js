import companyModel from "../models/companyModel.js";
import apiResponse from "../utils/apiResponse.js";

export default class companyServices {
    constructor() {
        this.CompanyModel = new companyModel;
    }

    async createCompany(companyData) {
        console.log("Service layer: createCompany called");
        if(!companyData.companyName || !companyData.email || !companyData.website)
        {
            return new apiResponse(500, null, "Missing required Details");
        }
        const user = {
            email: companyData.email,
            password: companyData.password,
            user_role: "company"
        };
        
        const userData = await this.userModel.createUser(user);
        
        if (!userData.success) {
            return new apiResponse(500, null, "User Creation Failed");
        }

        const response = await this.CompanyModel.createCompany(companyData,userData.data._id);
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
