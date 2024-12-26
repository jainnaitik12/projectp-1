import { Router } from "express";
import userController from "../controllers/user/userController.js";
import { protect } from "../middlewares/auth.middlewares.js";

const userRouter = Router();
const UserController = new userController();

userRouter.post("/signup", (req, res) => {
    UserController.createUser(req, res);
});

userRouter.post("/login", (req, res) => {
    UserController.loginUser(req, res);
});

userRouter.post("/logout", protect, (req, res) => {
    UserController.logoutUser(req, res);
});

userRouter.post("/refresh-token", (req, res) => {
    UserController.refreshAccessToken(req, res);
});

userRouter.post("/change-password", protect, (req, res, next) => {
    UserController.changeCurrentPassword(req, res, next);
});

userRouter.get("/me", protect, (req, res) => {
    UserController.getCurrentUser(req, res);
});

userRouter.put("/profile", protect, (req, res) => {
    UserController.updateUserProfile(req, res);
});

userRouter.put("/avatar", protect, (req, res) => {
    UserController.updateUserAvatar(req, res);
});

// userRouter.post("/assign-pcc", protect, (req, res) => { // Assuming only admin can access this route
//     UserController.assignStudentsToPCC(req, res);
// });

export default userRouter;