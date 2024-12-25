import asyncHandler from "../../utils/asyncHandler.js";
import StudentService from "../../services/student/studentService.js";

export default class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
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
}