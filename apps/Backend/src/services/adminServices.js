import User from "../schema/userSchema.js";
import apiResponse from "../utils/apiResponse.js";
import Student from "../schema/student/studentSchema.js";
// locking the students personalinfo and acdemics
export default class AdminServices{
      constructor(studentModel, userModel) {
        this.student = Student;
        this.user = userModel;
    }
//locking the students personalinfo and acdemics
async verifyAndLockStudent(studentId, adminId) {
  try {
    const student = await this.student.findById(studentId);
    if (!student) {
      return new apiResponse(404, null, "Student not found");
    }

    // Lock personal and academic info
    student.personalInfo.isLocked = true;
    student.academics.isLocked = true;

    // Add verification metadata
    student.verificationStatus = "verified";
    student.verifiedBy = adminId;
    student.verificationDate = new Date();

    const updatedStudent = await student.save();
   
    return new apiResponse(200, updatedStudent, "Student info locked and verified");
  } catch (error) {
    return new apiResponse(500, null, error.message);
  }
}

}