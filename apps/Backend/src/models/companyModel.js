import Company  from "../schema/company/companySchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class companyModel {
    company = Company;

    async createCompany(companyData) {
        console.log("Company Model: createCompany called");
        const {
            company_name,
            company_type,
            domain,
            job_profiles,
            eligibility_criteria,
            selection_process,
            contact_person,
            service_agreement,
            expected_recruits,
        } = companyData;

        try {
            const createdCompany = await this.company.create({
                company_name: company_name,
                company_type: company_type,
                domain: domain,
                job_profiles: job_profiles,
                eligibility_criteria: eligibility_criteria,
                selection_process: selection_process,
                contact_person: contact_person,
                service_agreement: service_agreement,
                expected_recruits: expected_recruits,
            });

            return new apiResponse(200, "Company created successfully", createdCompany);

        } catch (error) {
            console.error("Error in createCompany:", error.message);
            return new apiResponse(500, "Internal server error");
        }
    }

    async updateCompany(id, updates) {
        console.log("Company Model: updateCompany called");
        try {
            const updatedCompany = await this.company.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedCompany) {
                return new apiResponse(404, "Company not found");
            }
            return new apiResponse(200, "Company updated successfully", updatedCompany);
        } catch (error) {
            console.error("Error in updateCompany:", error.message);
            return new apiResponse(500, "Internal server error");
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
}
