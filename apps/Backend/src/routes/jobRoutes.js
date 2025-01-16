import { Router } from "express";
// import JobModel from "../models/jobModel.js";
// import JobService from "../services/jobService.js";
// import JobController from "../controllers/company/jobController.js";
// import  auth, {authorizeRoles } from "../middlewares/auth.middlewares.js";

const jobRoutes = Router();

//getting all job
jobRoutes.get("/bulk", (req, res) => {

});

//posting job
jobRoutes.post('/create', (req, res) => {

});

//deleting job
jobRoutes.delete("/delete/:id", (req, res) => {

});

//updating job
jobRoutes.put("/update/:id", (req, res) => {

});

//get job by id
jobRoutes.get("/getjob/:id", (req, res) => {

});

//make a job active
jobRoutes.put("/activejob/:id", (req, res) => {

});
//make a 

export default jobRoutes;