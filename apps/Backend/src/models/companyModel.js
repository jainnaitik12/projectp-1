import Company  from "../schema/company/companySchema.js";
import JNF from "../schema/company/jnfSchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class companyModel {
    company = Company;

    async createCompany(companyData, userId) {
        console.log("Company Model: createCompany called");
        const {companyName, email, website} = companyData;
        try {
            const createdCompany = await Company.create(
                {
                    user: userId,
                    companyName: companyName, 
                    email: email, 
                    website: website
                } 
            );
            console.log(createdCompany);
            return new apiResponse(201, "Company created successfully", createdCompany);
        } catch (error) {
            return new apiResponse(500, error.message);
        }
    }
    async updateCompany(id, updates) {
        console.log("Company Model: updateCompany called");
        try {
            const updatedCompany = await Company.findByIdAndUpdate(id, updates, { new: true });
            console.log(updatedCompany);

            if (!updatedCompany)
                { 
                    console.log("not updated");
                    return null;
                }
            return updatedCompany;

        } catch (error) {
            return new apiResponse(500, error.message);
        }
    }

    async deleteCompany(id) {
        console.log("Company Model: deleteCompany called");
        try {
            const deletedCompany = await this.company.findByIdAndDelete(id);
            if (!deletedCompany) {
                return new apiResponse(404, "Company not found");
            }
            return new apiResponse(200, "Company deleted successfully");
            
        } catch (error) {
            console.error("Error in deleteCompany:", error.message);
            return new apiResponse(500, "Internal server error");
        }
    }

    async addJNFToCompany(companyId, jnfData) {
        try {
            const company = await Company.findById(companyId);
            if (!company) {
                return new apiResponse(404, "Company not found");
            }

            
            const createdJNF = await JNF.create(jnfData);
            company.JNFs.push(createdJNF._id);
            await company.save();

            return new apiResponse(200, "JNF added successfully", createdJNF);
        } catch (error) {
            return new apiResponse(500, error.message);
        }
    }


    async getJNFsForCompany(companyId) {
        try {
            const company = await Company.findById(companyId).populate("JNFs");
            if (!company) {
                return new apiResponse(404, "Company not found");
            }
            return new apiResponse(200, "JNFs fetched successfully", company.JNFs);
        } catch (error) {
            return new apiResponse(500, error.message);
        }
    }
}
