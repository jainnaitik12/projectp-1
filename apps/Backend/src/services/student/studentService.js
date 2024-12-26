import StudentModel from "../../models/studentModel.js";
import UserModel from "../../models/userModel.js";
import apiResponse from "../../utils/apiResponse.js";

export default class StudentService {
    constructor(studentModel) {
         this.studentModel = studentModel;
        this.userModel = new UserModel();
    }

    async registerStudent(studentData) {
    try {
        // Validate required fields
        if (!studentData.email || 
            !studentData.password || 
            !studentData.personalInfo?.rollNumber || 
            !studentData.personalInfo?.name ||
            !studentData.personalInfo?.department ||
            !studentData.personalInfo?.batch ||
            !studentData.academics?.cgpa ||
            !studentData.academics?.tenthMarks ||
            !studentData.academics?.twelfthMarks) {
            return new apiResponse(400, null, "Missing required fields");
        }

        const userData = {
            email: studentData.email,
            password: studentData.password,
            user_role: "student"
        };
        
        const user = await this.userModel.createUser(userData);
        
        if (!user.success) {
            throw new Error("User creation failed");
        }

        // Create student profile with existing structure
        const student = await this.studentModel.registerStudent({
            personalInfo: studentData.personalInfo,
            academics: studentData.academics
        }, user.data._id);

        if (!student.success) {
            await this.userModel.deleteUser(user.data._id);
            return new apiResponse(400, null, "Student profile creation failed");
        }
    
        return new apiResponse(201, {
            user: user.data,
            student: student.data
        }, "Student registered successfully");

    } catch (error) {
        return new apiResponse(500, null, error.message);
    }
}
    async updateProfile(id,studentData){
        try {
            const updatedProfile = await this.studentModel.updateProfile(id,studentData);
            return new apiResponse(200, updatedProfile.data, "Profile updated successfully");
        } catch (error) {
            return new apiResponse(500, null, error.message);
        }
    }
}