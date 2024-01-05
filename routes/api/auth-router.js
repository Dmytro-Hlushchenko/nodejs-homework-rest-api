import express from "express";
import { isEmptyBody, isValidId, } from "../../middlewares/index.js";

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.userRegister);
authRouter.post("/login", isEmptyBody, authController.userLogin);

export default authRouter;