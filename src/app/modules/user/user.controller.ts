import config from "../../config";
import { userServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import { Tuser } from "./user.interfact";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const userData: Tuser = {
    id: "",
    role: "student",
    needsPasswordChange: true,
    password: password || config.defaultPassword,
  };

  const data = await userServices.createStudentInDB(userData, studentData);

  return res.status(200).json({
    success: true,
    message: "Student user created successfully",
    data,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const userData: Tuser = {
    id: "",
    role: "faculty",
    needsPasswordChange: true,
    password: password || config.defaultPassword,
  };
  const data = await userServices.createFacultyIntoDB(userData, facultyData);
  return res.status(200).json({
    success: true,
    message: "Faculty user created successfully",
    data,
  });
});

export const userController = {
  createStudent,
  createFaculty,
};
