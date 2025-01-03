import Job  from "../schema/company/jobSchema.js";
import JNF from "../schema/company/jnfSchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class jobModel {
    job = Job;

    async getJobById(jobid) {
        console.log("Job Model: getJobById called");
    
        try {
            const job = await this.job.findById(jobid).populate("JNFs"); 
            if (!job) {
                return null; 
            }
    
            return job; 
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async updateJob(jobid, updates) {
        console.log("Job Model: updateJob called");
        try {
            const updatedJob = await this.job.findByIdAndUpdate(jobid, updates, { new: true });
            console.log(updatedJob);

            if (!updatedJob)
                { 
                    console.log("not updated");
                    return null;
                }
            return updatedJob;

        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async deleteJob(jobid) {
        console.log("Job Model: deleteJob called");
        try {
            const deletedJob = await this.job.findByIdAndDelete(jobid);
            if (!deletedJob) {
                return new apiResponse(404, null, "Job not found");
            }
            return new apiResponse(200, null, "Job deleted successfully");
            
        } catch (error) {
            console.error("Error in deleteJob:", error.message);
            return new apiResponse(500, null, error.message);
        }
    }

    async activateJob(jobId) {
        console.log("Job Model: activateJob called");
        try {
            const updatedJob = await this.job.findByIdAndUpdate(
                jobId,
                { status: "open" }, 
                { new: true }
            );
    
            if (!updatedJob) {
                return null;
            }
    
            return updatedJob;
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

    async closeJob(jobId) {
        console.log("Job Model: closeJob called");
        try {
            const updatedJob = await this.job.findByIdAndUpdate(
                jobId,
                { status: "closed" }, 
                { new: true }
            );
    
            if (!updatedJob) {
                return null;
            }
    
            return updatedJob;
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }
}