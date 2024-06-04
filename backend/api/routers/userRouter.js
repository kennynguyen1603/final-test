import { Router } from "express";
import userController from "../controllers/userController.js";
import {
  validateLogin,
  validateRegister,
} from "../middleware/validateFields.js";

const UserRouter = Router();

UserRouter.post("/register", validateRegister, userController.register);

UserRouter.post("/login", validateLogin, userController.login);

UserRouter.post("/logout", userController.logout);

export default UserRouter;
