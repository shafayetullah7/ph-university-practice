import express from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const userRouter = express.Router();

userRouter.post("/create-student",validateRequest(userValidation.createStudentValidationSchema),userController.createStudent);

export default userRouter;
