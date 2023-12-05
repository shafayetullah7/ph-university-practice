import catchAsync from "../../utils/catchAsync";
import { academicFacultyServices } from "./academicFaculty.services";
import httpStatus from "http-status";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFaculty } = req.body;
  const newAcademicFaculty = await academicFacultyServices.createAcademicFacultyIntoDB(
    academicFaculty
  );
  return res.status(httpStatus.OK).json({
    success: true,
    message: "New academic faculty created",
    data: newAcademicFaculty,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params;
  const academicFaculty = await academicFacultyServices.getSingleAcademicFacultyFromDB(
    academicFacultyId
  );
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Fetched single academic faculty",
    data: academicFaculty,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const academicFaculties = await academicFacultyServices.getAllAcademicFacultiesFromDB();
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Fetched all academic faculties",
    data: academicFaculties,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId: id } = req.params;
  const { academicFaculty: payload } = req.body;
  const updatedAcademicFaculty = await academicFacultyServices.updateAcademicFacultyInDB(
    id,
    payload
  );
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Academic faculty updated",
    data: updatedAcademicFaculty,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
};
