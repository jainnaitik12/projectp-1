import jobService from "../../services/jobService.js";
import apiResponse from "../../utils/apiResponse.js";
import jobModel from "../../models/jobModel.js";

export default class jobController {
    constructor() {
        this.JobService = new jobService(jobModel);
    }

    async getAllJobs(req, res) {
        try {
            const response = await this.JobService.getAllJobs();
            if(!response) {
                return new apiResponse(404, null, "Not Found");
            }
            return response;
        }
        catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async createJob(req, res) {
        const { jnfid } = req.params;
        try {
            const response = await this.JobService.createJob(jnfid, req.body);

            if(!response) {
                return new apiResponse(404, null, "Not Found");
            }
            return response;
        }
        catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async getJobById(req, res) {
        const { jobid } = req.params;
    
        try {
            const response = await this.JobService.getJobById(jobid);
            if(!response) {
                return new apiResponse(404, null, "Not Found");
            }
            return response;
        }
        catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }



    async updateJob(req, res) {

        const { jobid } = req.params;
        const updates = req.body;

        try {
            const response = await this.JobService.updateJob(jobid, updates);

            if(!response) {
                return new apiResponse(404, null, "Not Found");
            }
            return response;
        }
        catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async deleteJob(req, res) {
        const { jobid } = req.params;

        try {
            const response = await this.JobService.deleteJob(jobid);

            if(!response) {
                return new apiResponse(404, null, "Not Found");
            }
            return response;
        }
        catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async activateJob(req, res) {
        const { jobid } = req.params;

        try {
            const response = await this.JobService.activateJob(jobid);

            if(!response) {
                return new apiResponse(404, null, "Not Found");
            }
            return response;
        }
        catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async closeJob(req, res) {
        const { jobid } = req.params;

        try {
            const response = await this.JobService.closeJob(jobid);

            if(!response) {
                return new apiResponse(404, null, "Not Found");
            }
            return response;
        }
        catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }
}
