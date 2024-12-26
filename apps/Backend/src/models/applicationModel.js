import apiResponse from "../utils/apiResponse.js";
import Application from "../schema/general/applicationSchema.js"
export default class ApplicationModel{
    application = Application;
    
   async applyForJob(studentId,jobId){
    try {

        const existingApplication = await this.application.findOne({
            student: studentId,
                job: jobId
        });
        if (existingApplication) {
            return new apiResponse(400, null, "Already applied for this job");
        }
          const application = new Application({
                student: studentId,
                job: jobId,
                status: "applied",
                appliedAt: new Date()
            });
            await application.save();

             return new apiResponse(201, application, "Application created successfully");
    } catch (error) {
        return new apiResponse(500,null,"An error occurred during application creation");
    }
   }

    async getApplicationsByStudent(studentId){
        try {
            const applications = await this.application.find({student:studentId}).populate({
                path:'job',
                select :'title company package location status deadline',
                populate:{
                    path:'company',
                    select :'name'            
                    }
            })
            .sort('-appliedAt');
            
              if (!applications || applications.length === 0) {
                return new apiResponse(404, [], "No applications found");
            }

            return new apiResponse(200, applications, "Applications fetched successfully");
        } catch (error) {
             return new apiResponse(500, null, "Error fetching applications");
            
        }
    }

}