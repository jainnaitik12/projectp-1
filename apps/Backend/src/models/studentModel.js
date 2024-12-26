import Student from "../schema/student/studentSchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class StudentModel {
    student = Student;

    async registerStudent(profileData,userId) {
        try {
          const newStudent = await this.student.create({
            user:userId,
            personalInfo:profileData.personalInfo,
            academics:profileData.academics,
          });
          return new apiResponse(201,newStudent,"Student Created Succesfully");

        } catch (error) {
            return new apiResponse(500,null, "An error occurred while creating student");
        }
    }

    async updateProfile(id,studentData){
      try {
        const student = await this.student.findById(id);
        if(!student){
          return new apiResponse(404,null, "Student not found");
        }
            
      if (!student.personalInfo.isLocked && studentData.personalInfo) {
      Object.assign(student.personalInfo, studentData.personalInfo);
    }
    
    if (!student.academics.isLocked && studentData.academics) {
      Object.assign(student.academics, studentData.academics);
    }

      // Update unlocked fields
    
    if (studentData.skills) student.skills = studentData.skills;
    if (studentData.projects) student.projects = studentData.projects;
    if (studentData.experience) student.experience = studentData.experience;
    if (studentData.education) student.education = studentData.education;

        const updatedStudent = await student.save({ new: true });
   
        return new apiResponse(200, updatedStudent, "Profile updated successfully");
      } catch (error) {
        return new apiResponse(500,null, "An error occurred while updating student profile");
      }
    }

    async getProfile(studentId){
      try {
        const student = await this.student.findById(studentId);
        if(!student){
          return new apiResponse(404,null, "Student not found");
        }
        return new apiResponse(200,student,"Student found successfully");
      } catch (error) {
        return new apiResponse(500,null, "An error occurred while fetching student profile");
      }
    }
}