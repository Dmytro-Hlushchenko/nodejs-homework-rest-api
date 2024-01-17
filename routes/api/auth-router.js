import express from "express";
import { authenticate, isEmptyBody, upload } from "../../middlewares/index.js"; 
import { validateBody } from "../../decorators/index.js";
import { userRegistrationSchema, userLoginSchema } from "../../models/User.js"

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userRegistrationSchema), authController.userRegister);
authRouter.post("/login", isEmptyBody, validateBody(userLoginSchema), authController.userLogin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch("/avatars", upload.single("avatarURL"), authenticate, authController.updateAvatar);

export default authRouter;