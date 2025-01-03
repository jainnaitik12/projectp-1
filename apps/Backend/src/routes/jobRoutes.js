import { Router } from "express";
import JobModel from "../models/jobModel.js";
import JobService from "../services/jobService.js";
import JobController from "../controllers/company/jobController.js";

const jobRouter = Router();
const jobModel = new JobModel();
const jobService = new JobService(jobModel);
const jobController = new JobController(jobService);


//getting all job
jobRouter.get("/bulk", (req, res) => {
    jobController.getAllJobs(req,res);
});
//posting job
jobRouter.post('/create', (req, res) => {
    jobController.createJob(req,res);
})
//deleting job
jobRouter.delete("/delete/:id", (req, res) => {
    jobController.deleteJob(req,res);
})
//updating job
jobRouter.put("/update/:id", (req, res) => {
    jobController.updateJob(req,res);
})
//get job by id
jobRouter.get("/getjob/:id", (req, res) => {
    jobController.getJobById(req,res);
})
//make a job active
jobRouter.put("/activejob/:id", (req, res) => {
    jobController.activateJob(req,res);
})
//to close a job
jobRouter.put("/closejob/:id", (req, res) => {
    jobController.closeJob(req,res);
})

export default jobRouter;