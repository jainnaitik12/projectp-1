import companyServices from "../../services/companyServices.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";
import companyModel from "../../models/companyModel.js";

export default class companyController {
    constructor() {
        this.CompanyService = new companyServices(companyModel);
    }

    async createCompany(req, res) {
        try {
            const response = await this.CompanyService.createCompany(req.body);

            if (!response) {
                return res.status(500).json(new apiError(500, "Company not created"));
            }

            return res.status(201).json(new apiResponse(201, "Company created successfully", response));
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

    async addJNFToCompany(req, res) {
        const { companyId } = req.params;
        const jnfData = req.body;
        try {
            const response = await this.CompanyService.addJNFToCompany(companyId, jnfData);
            if (!response) return res.status(500).json(new apiError(500, "Failed to add JNF"));
            return res.status(200).json(new apiResponse(200, "JNF added to company successfully", response));
        } catch (error) {
            return res.status(500).json(new apiError(500, error.message));
        }
    }

    async getJNFsForCompany(req, res) {
        const { companyId } = req.params;
        try {
            const response = await this.CompanyService.getJNFsForCompany(companyId);
            if (!response) return res.status(404).json(new apiError(404, "JNFs not found"));
            return res.status(200).json(new apiResponse(200, "JNFs fetched successfully", response));
        } catch (error) {
            return res.status(500).json(new apiError(500, error.message));
        }
    }
}
