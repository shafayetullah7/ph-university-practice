import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";

const academicDepartmentRouter = express.Router();

academicDepartmentRouter.post(
  "/",
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidation
  ),
  academicDepartmentController.createAcademicDepartment
);

export default academicDepartmentRouter;
