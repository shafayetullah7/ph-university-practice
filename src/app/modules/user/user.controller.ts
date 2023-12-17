import config from "../../config";
import { userServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import { Tuser } from "./user.interfact";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const userData: Tuser = {
    id: "2",
    role: "student",
    needsPasswordChange: true,
    password: password || config.defaultPassword,
  };

  const data = await userServices.createStudentInDB(userData, studentData);

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    data,
  });
});

export const userController = {
  createStudent,
};
