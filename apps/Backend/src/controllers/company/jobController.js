import jobService from "../../services/jobService.js";
import apiResponse from "../../utils/apiResponse.js";
import jobModel from "../../models/jobModel.js";

export default class jobController {
    constructor() {
        this.JobService = new jobService(jobModel);
        this.userModel = new UserModel();
    }

    async getAllJobs(req, res) {
        try {
            const response = await this.JobService.getAllJobs();
            if(!response) {
                new apiResponse(404, null, "Not Found");
            }
            res.status(200).json(response);
        }
        catch (error) {
            new apiResponse(500, null, error.message);
        }
    }

    async createJob(req, res) {
        const { id } = req.params;

        const createdBy = req.user._id; 
        try {
            const response = await this.JobService.createJob(id, createdBy);

            if(!response) {
                new apiResponse(404, null, "Not Found");
            }
            res.status(200).json(response);
        }
        catch (error) {
            new apiResponse(500, null, error.message);
        }
    }

    async getJobById(req, res) {
        const { id } = req.params;
    
        try {
            const response = await this.JobService.getJobById(id);
            if(!response) {
                new apiResponse(404, null, "Not Found");
            }
            res.status(200).json(response);
        }
        catch (error) {
            new apiResponse(500, null, error.message);
        }
    }



    async updateJob(req, res) {

        const { id } = req.params;
        const updates = req.body;

        try {
            const response = await this.JobService.updateJob(id, updates);

            if(!response) {
                new apiResponse(404, null, "Not Found");
            }
            res.status(200).json(response);
        }
        catch (error) {
            new apiResponse(500, null, error.message);
        }
    }

    async deleteJob(req, res) {
        console.log("Controller later : deleteJob");
        const { id } = req.params;

        try {
            const response = await this.JobService.deleteJob(id);

            if(!response) {
                new apiResponse(404, null, "Not Found");
            }
            res.status(200).json(response);
        }
        catch (error) {
            new apiResponse(500, null, error.message);
        }
    }

    async activateJob(req, res) {
        const { id } = req.params;

        try {
            const response = await this.JobService.activateJob(id);

            if(!response) {
                new apiResponse(404, null, "Not Found");
            }
            res.status(200).json(response);
        }
        catch (error) {
            new apiResponse(500, null, error.message);
        }
    }

    async closeJob(req, res) {
        const { id } = req.params;

        try {
            const response = await this.JobService.closeJob(id);

            if(!response) {
                new apiResponse(404, null, "Not Found");
            }
            res.status(200).json(response);
        }
        catch (error) {
            new apiResponse(500, null, error.message);
        }
    }
}
