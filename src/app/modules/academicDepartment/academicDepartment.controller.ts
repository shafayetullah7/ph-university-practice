import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { academicDepartmentServices } from "./academicDepartment.services";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const { academicDepartment } = req.body;
  const newAcademicDepartment = await academicDepartmentServices.createAcademicDepartmentIntoDB(
    academicDepartment
  );
  return res
    .status(httpStatus.OK)
    .json({
      success: true,
      message: "New academic department is created",
      data: newAcademicDepartment,
    });
});


export const academicDepartmentController = {
    createAcademicDepartment
}