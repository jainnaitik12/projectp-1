import asyncHandler from "../../utils/asyncHandler.js";
import StudentService from "../../services/student/studentService.js";

export default class StudentController {
    constructor() {
        this.studentService = new StudentService();
    }
    registerStudent = asyncHandler(async (req, res) => {
        const student = await this.studentService.registerStudent(req.body);
        res.status(student.statusCode).json(student);
    });
    
    updateProfile = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const updatedProfile = await this.studentService.updateProfile(id, req.body);
        res.status(updatedProfile.statusCode).json(updatedProfile);
    });
    getProfile= asyncHandler(async(req,res)=>{
        const {id}= req.params;
        const profile = await this.studentService.getProfile(id);
        res.status(profile.statusCode).json(profile);
    })
    
    //notification controllers for students
    getNotifications = asyncHandler(async (req, res) => {
        const notifications = await this.studentService.getNotifications();
        res.status(notifications.statusCode).json(notifications);
    });
}