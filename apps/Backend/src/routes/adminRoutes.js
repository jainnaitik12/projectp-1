import { Router } from "express";
import AdminController from "../controllers/admin/Admincontroller.js";
import AdminServices from "../services/adminServices.js";
import Student from "../schema/student/studentSchema.js";
import User from "../schema/userSchema.js";
const adminRouter = Router();
const adminService = new AdminServices(Student, User);
const adminController = new AdminController(adminService);

// Add auth middleware
adminRouter.post("/verifyStudent/:id", (req, res) => {
    adminController.verifyAndLockStudent(req, res);
});

export default adminRouter;