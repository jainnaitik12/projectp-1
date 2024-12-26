import { Router } from "express";
import StudentModel from "../models/studentModel.js";
import StudentController from "../controllers/student/studentController.js";
import StudentService from "../services/student/studentService.js";
import ApplicationController from "../controllers/student/applicationController.js";
import ApplicationService from "../services/student/applicationService.js";
const studentRouter = Router();
const studentModel = new StudentModel();
const studentService = new StudentService(studentModel);
const applicationService = new ApplicationService();
const applicationController = new ApplicationController(applicationService);
const studentController = new StudentController(studentService);

studentRouter.post("/register", (req, res) => studentController.registerStudent(req, res));
studentRouter.put("/profile/:id", (req, res) => studentController.updateProfile(req, res));
studentRouter.get("/eligible-jobs/:id", (req, res) => applicationController.getEligibleJobs(req, res));
export default studentRouter;