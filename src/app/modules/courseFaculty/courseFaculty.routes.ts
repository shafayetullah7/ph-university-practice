import express from "express";
import { courseFacultyController } from "./courseFaculty.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { courseFacultyValidation } from "./courseFaculty.validation";

const courseFacultyRouter = express.Router();

courseFacultyRouter.put(
  "/",
  validateRequest(courseFacultyValidation.createdCourseFacultyValidationSchema),
  courseFacultyController.assignCourse
);

export default courseFacultyRouter;
