import Student from "../schema/student/studentSchema.js";
import apiResponse from "../utils/apiResponse.js";

export default class StudentModel {
    student = Student;

    async registerStudent(profileData,userId) {
        try {
          const existingStudent = await this.student.findOne({
                'personalInfo.rollNumber': profileData.personalInfo.rollNumber
            });
            
            if (existingStudent) {
                return new apiResponse(409, null, "Roll number already exists");
            }
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
            
         if (student.personalInfo.isLocked && studentData.personalInfo) {
            console.log("Attempt to update locked personal info");
            return new apiResponse(403, null, "Cannot update locked personal information");
        }
  if (student.academics.isLocked && studentData.academics) {
            console.log("Attempt to update locked academics");
            return new apiResponse(403, null, "Cannot update locked academic information");
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

         try {
            const updatedStudent = await student.save();
            return new apiResponse(200, updatedStudent, "Profile updated successfully");
        } catch (saveError) {
            if (saveError.statusCode === 403) {
                return new apiResponse(403, null, saveError.message);
            }
            throw saveError;
        }
      } catch (error) {
         console.error("Update error:", error);
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
    
    async getStudentById(studentId){
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