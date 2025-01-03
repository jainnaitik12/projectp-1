import { Router } from "express";
import JobModel from "../models/jobModel.js";
import JobService from "../services/jobService.js";
import JobController from "../controllers/company/jobController.js";
import  auth, {authorizeRoles } from "../middlewares/auth.middlewares.js";

const jobRouter = Router();
const jobModel = new JobModel();
const jobService = new JobService(jobModel);
const jobController = new JobController(jobService);


jobRouter.get("/bulk", (req, res) => {
    jobController.getAllJobs(req,res);
});

jobRouter.post("/create/:id", auth, authorizeRoles('admin'),(req, res) => {
    jobController.createJob(req,res);
})

jobRouter.delete("/delete/:id", auth, authorizeRoles('admin'),(req, res) => {
    jobController.deleteJob(req,res);
})

jobRouter.put("/update/:id", auth, authorizeRoles('admin'),(req, res) => {
    jobController.updateJob(req,res);
})

jobRouter.get("/getjob/:id", (req, res) => {
    jobController.getJobById(req,res);
})

jobRouter.put("/activejob/:id", auth, authorizeRoles('admin'),(req, res) => {
    jobController.activateJob(req,res);
})

jobRouter.put("/closejob/:id", auth, authorizeRoles('admin'),(req, res) => {
    jobController.closeJob(req,res);
})

export default jobRouter;