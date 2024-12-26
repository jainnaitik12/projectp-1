import asyncHandler from "../../utils/asyncHandler.js"
import AdminServices from "../../services/adminServices.js";
export default class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
     };

    async createAdmin(req, res) {
        try {
            const admin = await this.adminService.createAdmin(req.body);
            res.status(201).json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
   //for veryfying the student's data
    verifyAndLockStudent = asyncHandler(async (req, res) => {
        const result = await this.adminService.verifyAndLockStudent(
            req.params.id,
            req.user._id // from auth middleware
        );
        res.status(result.statusCode).json(result);
    });
}

