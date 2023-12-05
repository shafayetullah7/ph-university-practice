import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicSemesterServices } from "./academicSemester.services";

const createAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemester } = req.body;
  const newSemester = await academicSemesterServices.createAcademicSemesterInotDB(
    academicSemester
  );
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Academic semester created",
    data: newSemester,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
};
