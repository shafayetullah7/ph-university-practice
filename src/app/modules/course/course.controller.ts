import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.services";

const createCourse = catchAsync(async (req, res) => {
  const { course } = req.body;
  const newCourse = await courseServices.createCourseIntoDB(course);
  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "New course created",
    newCourse,
  });
});

const getCourses = catchAsync(async (req, res) => {
  const courses = await courseServices.getCoursesFromDB(req.query);
  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Courses retrieved",
    courses,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const course = await courseServices.getCourseFromDB(req.params.courseId);
  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Course retrieved",
    course,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const updatedCourse = await courseServices.updateCourseIntoDB(
    req.params.courseId,
    req.body.course
  );
  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Course updated",
    updatedCourse,
  });
});

export const courseController = {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
};
