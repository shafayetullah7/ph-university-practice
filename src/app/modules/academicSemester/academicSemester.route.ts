import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";
import { academicSemesterControllers } from "./academicSemester.controller";

const academicSemesterRouter = express.Router();

academicSemesterRouter.post(
  "/",
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  academicSemesterControllers.createAcademicSemester
);


export default academicSemesterRouter;