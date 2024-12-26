import companyModel from "../models/companyModel.js";

export default class companyServices {
    constructor() {
        this.CompanyModel = new companyModel();
    }

    async createCompany(companyData) {
        console.log("Service layer: createCompany called");
        const response = await this.CompanyModel.createCompany(companyData);
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
}
