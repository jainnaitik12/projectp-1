import AsyncHandler from "../../utils/asyncHandler.js"

export default class AdminController {
    constructor(adminService) { };

    async createAdmin(req, res) {
        try {
            const admin = await this.adminService.createAdmin(req.body);
            res.status(201).json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}