import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { facultyServices } from "./faculty.services";

const getFaculties = catchAsync(async (req, res) => {
  const faculties = await facultyServices.getAllFacultyFromDB(req.query);
  return res
    .status(httpStatus.OK)
    .json({ success: true, message: "Faculties retrieved", data: faculties });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const faculty = await facultyServices.getSingleFacultyFromDB(
    req.params.facultyId
  );
  return res
    .status(httpStatus.OK)
    .json({ success: true, message: "Faculty retrieved", data: faculty });
});

const updateFaculty = catchAsync(async (req, res) => {
  const updatedFaculty = await facultyServices.updateFacultyIntoDB(
    req.params.facultyId,
    req.body.faculty
  );
  return res
    .status(httpStatus.OK)
    .json({ success: true, message: "Faculty updated", data: updatedFaculty });
});

export const facultyController = {
  getFaculties,
  getSingleFaculty,
  updateFaculty,
};
