import express from "express";
import { isEmptyBody, isValidId, } from "../../middlewares/index.js";

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/-", isEmptyBody, authController.userRegister);

export default authRouter;