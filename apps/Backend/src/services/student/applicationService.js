import ApplicationModel from "../../models/applicationModel.js";
import apiResponse from "../../utils/apiResponse.js";
import StudentService from "./studentService.js";
import JobService from "../jobService.js";
//for student : to get all jobs details and his applied jobs details
export default class ApplicationService {
  constructor() {
    this.studentServices = new StudentService();
    this.jobServices = new JobService();
    this.applicationModel = new ApplicationModel();
  }
  async applyForJob(studentId, jobId) {
    try {
      const student = await this.studentServices.getStudentById(studentId);

      const job = await this.jobServices.getJobById(jobId);

      const application = new this.applicationModel.applyForJob(
        studentId,
        jobId
      );
      return new apiResponse(
        201,
        application,
        "Application created successfully"
      );
    } catch (error) {
      return new apiResponse(500, null, error.message);
    }
  }

  async getApplicationsByStudent(studentId) {
    try {
      const student = await this.studentServices.getStudentById(studentId);

      if (student.statusCode === 404) {
        return new apiResponse(404, null, "Student not found");
      }

      const applications = await this.applicationModel.getApplicationsByStudent(
        studentId
      );
      return applications;
    } catch (error) {
      console.error("Service error:", error);
      return new apiResponse(500, null, "Error fetching applications");
      // return new apiResponse(500, null, error.message);
    }
  }
  async checkEligibility(student, job) {
    if (student.academics.cgpa < job.eligibility.minCGPA) {
      return false;
    }
    if (
      !job.eligibility.departments.includes(student.personalInfo.department)
    ) {
      return false;
    }
    if (student.personalInfo.batch !== job.eligibility.batch) {
      return false;
    }
    if (
      job.eligibility.tenthMarks &&
      student.academics.tenthMarks < job.eligibility.tenthMarks
    ) {
      return false;
    }
    if (
      job.eligibility.twelfthMarks &&
      student.academics.twelfthMarks < job.eligibility.twelfthMarks
    ) {
      return false;
    }
    return true;
  }
  async getEligibleJobs(studentId) {
    try {
      const student = await this.studentServices.getStudentById(studentId);
      if (!student) {
        return new apiResponse(404, null, "Student not found");
      }

      const allJobs = await this.jobServices.getAllJobs();

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

      return new apiResponse(
        200,
        eligibleJobs,
        "Eligible jobs fetched successfully"
      );
    } catch (error) {
      return new apiResponse(500, null, error.message);
    }
  }
}
