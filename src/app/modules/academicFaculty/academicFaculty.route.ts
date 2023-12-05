import express from "express";
import { academicFacultyControllers } from "./academicFaculty.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";

const academicFacultyRouter = express.Router();

academicFacultyRouter.post(
  "/",
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  academicFacultyControllers.createAcademicFaculty
);

academicFacultyRouter.get(
  "/",
  academicFacultyControllers.getAllAcademicFaculties
);

academicFacultyRouter.get(
  "/:academicFacultyId",
  academicFacultyControllers.getSingleAcademicFaculty
);

academicFacultyRouter.put(
  "/:academicFacultyId",
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyControllers.updateAcademicFaculty
);

export default academicFacultyRouter;
