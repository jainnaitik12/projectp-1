import { Router } from "express";
import userModel from "../models/userModel.js";
import userServices from "../services/userServices.js";
import userController from "../controllers/user/userController.js";

const userRouter = Router();

const UserModel = new userModel();
const UserServices = new userServices(UserModel);
const UserController = new userController(UserServices);

userRouter.post("/signup", (req, res) => {
    UserController.createUser(req, res);
});

export default userRouter;