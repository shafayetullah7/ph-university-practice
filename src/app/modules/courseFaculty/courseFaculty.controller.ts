import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { courseFacultyServices } from "./courseFaculty.services";

const assignCourse = catchAsync(async (req, res) => {
  const { courseFaculty: courseFacultyData } = req.body;
  const courseFaculty =
    await courseFacultyServices.assignCourseIntoDB(courseFacultyData);
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Course has been assigned",
    data: courseFaculty,
  });
});

export const courseFacultyController = {
  assignCourse,
};
