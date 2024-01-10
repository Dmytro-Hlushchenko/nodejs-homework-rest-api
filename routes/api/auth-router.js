import express from "express";
import { authenticate, isEmptyBody } from "../../middlewares/index.js"; 
// import { validateBody }  from "../../decorators/index.js";
// import { userRegistrationSchema, userLoginSchema } from "../../models/User.js"

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.userRegister);
authRouter.post("/login", isEmptyBody, authController.userLogin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;