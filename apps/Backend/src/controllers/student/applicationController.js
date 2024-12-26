import asyncHandler from "../../utils/asyncHandler.js";
import ApplicationService from "../../services/student/applicationService.js";

export default class ApplicationController {
    constructor(applicationService) {
        this.applicationService =  applicationService;
    }

    applyForJob = asyncHandler(async (req, res) => {
        const { studentId, jobId } = req.params;
        const result = await this.applicationService.applyForJob(studentId, jobId);
        
        
        res.status(result.statusCode).json(result);
    });
    getApplications = asyncHandler(async (req, res) => {
        const { studentId } = req.params;
        const applications = await this.applicationService.getApplications(studentId);
        res.status(applications.statusCode).json(applications);
    });
   getEligibleJobs = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const jobs = await this.applicationService.getEligibleJobs(id);
    res.status(jobs.statusCode).json(jobs);
});
    
}