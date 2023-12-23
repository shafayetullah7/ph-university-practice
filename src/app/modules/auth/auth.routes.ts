import express from "express";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser
);

authRouter.post(
  "/cange-password",
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword
);

authRouter.post("/refresh-token", authController.refreshToken);

export default authRouter;
