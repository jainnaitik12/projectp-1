import companyServices from "../../services/companyServices.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";
import companyModel from "../../models/companyModel.js";

export default class companyController {
    constructor() {
        this.CompanyService = new companyServices(companyModel);
    }

    async createCompany(req, res) {

        const { company_name, company_type, domain, job_profiles, eligibility_criteria, selection_process } = req.body;
        try {
            const response = await this.CompanyService.createCompany({
                company_name,
                company_type,
                domain,
                job_profiles,
                eligibility_criteria,
                selection_process
            });

            if (!response) {
                return res.status(500).json(new apiError(500, "Company not created"));
            }

            return res.status(201).json(new apiResponse(201, "Company added successfully", response));
        } catch (error) {
            return res.status(500).json(new apiError(500, error.message));
        }
    }

    async updateCompany(req, res) {
        const { id } = req.params;
        const updates = req.body;
        try {
            const response = await this.CompanyService.updateCompany(id, updates);

            if (!response) {
                return res.status(404).json(new apiError(404, "Company not found"));
            }
            return res.status(200).json(new apiResponse(200, "Company updated successfully", response));

        } catch (error) {
            return res.status(500).json(new apiError(500, error.message));
        }
    }

    async deleteCompany(req, res) {

        const { id } = req.params;
        try {
            const response = await this.CompanyService.deleteCompany(id);

            if (!response) {
                return res.status(404).json(new apiError(404, "Company not found"));
            }
            return res.status(200).json(new apiResponse(200, "Company removed successfully"));
            
        } catch (error) {
            return res.status(500).json(new apiError(500, error.message));
        }
    }
}
