import Application from "../../schema/general/applicationSchema.js";
import Job from "../../schema/company/jobSchema.js";
import Student from "../../schema/student/studentSchema.js";
import apiResponse from "../../utils/apiResponse.js";

//for student : to get all jobs details and his applied jobs details
export default class ApplicationService{
   
    async applyForJob(studentId, jobId) {
        try {
            const student = await Student.findById(studentId);
            if (!student) {
                return new apiResponse(404, null, "Student not found");
            }
            
            const job = await Job.findById(jobId);
            if (!job) {
                return new apiResponse(404, null, "Job not found");
            }
            const existingApplication = await Application.findOne({
                student: studentId,
                job: jobId
            });

            if (existingApplication) {
                return new apiResponse(400, null, "Already applied for this job");
            }

            const application = new Application({
                student: studentId,
                job: jobId,
                status: "applied",
                appliedAt: new Date()
            });
            
            await application.save();
            
            return new apiResponse(201, application, "Application created successfully");
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }
    async getApplications(studentId) {
        try {
            const applications = await Application.find({ student: studentId });
            return new apiResponse(200, applications, "Applications fetched successfully");
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }
     async checkEligibility(student, job) {
        if (student.academics.cgpa < job.eligibility.minCGPA) {
            return false;
        }
        if (!job.eligibility.departments.includes(student.personalInfo.department)) {
            return false;
        }
        if (student.personalInfo.batch !== job.eligibility.batch) {
            return false;
        }
        if (job.eligibility.tenthMarks && student.academics.tenthMarks < job.eligibility.tenthMarks) {
            return false;
        }
        if (job.eligibility.twelfthMarks && student.academics.twelfthMarks < job.eligibility.twelfthMarks) {
            return false;
        }
        return true;
    }
   async getEligibleJobs(studentId) {
        try {
            const student = await Student.findById(studentId);
            if (!student) {
                return new apiResponse(404, null, "Student not found");
            }

            const allJobs = await Job.find({ status: "active" });
            const eligibleJobs = [];
 if (!allJobs || allJobs.length === 0) {
            return new apiResponse(200, [], "No active jobs available");
        }
            for (const job of allJobs) {
                const isEligible = await this.checkEligibility(student, job);
                if (isEligible) {
                    eligibleJobs.push(job);
                }
            }

            return new apiResponse(200, eligibleJobs, "Eligible jobs fetched successfully");
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }

}