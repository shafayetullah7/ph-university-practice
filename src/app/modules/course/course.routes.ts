import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { courseValidation } from "./course.validation";
import { courseController } from "./course.controller";

const courseRouter = express.Router();

courseRouter.post(
  "/",
  validateRequest(courseValidation.createCourseValidationSchema),
  courseController.createCourse
);
courseRouter.get("/:courseId", courseController.getSingleCourse);
courseRouter.get("/", courseController.getCourses);
courseRouter.patch(
  "/",
  validateRequest(courseValidation.updateCourseValidationSchema),
  courseController.updateCourse
);
