import asyncHandler from "../../utils/asyncHandler.js";
import ApplicationService from "../../services/student/applicationService.js";

export default class ApplicationController {
    constructor() {
        this.applicationService = new ApplicationService();
    }

    applyForJob = asyncHandler(async (req, res) => {
        const { studentId, jobId } = req.params;
        const result = await this.applicationService.applyForJob(studentId, jobId);
        
        
        res.status(result.statusCode).json(result);
    });
    getApplicationsByStudent = asyncHandler(async (req, res) => {
        const { studentId } = req.params;
         if (!studentId) {
        return res.status(400).json(new apiResponse(400, null, "Student ID is required"));
    }
        const applications = await this.applicationService.getApplicationsByStudent(studentId);
        res.status(applications.statusCode).json(applications);
    });
   getEligibleJobs = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const jobs = await this.applicationService.getEligibleJobs(id);
    res.status(jobs.statusCode).json(jobs);
});
    
}