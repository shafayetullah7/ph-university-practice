import { Tstudent } from "../student/student.interface";
import Student from "../student/student.model";
import { Tuser } from "./user.interfact";
import User from "./user.model";
import generateId from "../../utils/generateId";
import mongoose from "mongoose";
import { AppError } from "../../errors/appError";
import httpStatus from "http-status";

const createStudentInDB = async (userData: Tuser, studentData: Tstudent) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateId(studentData.academicSemester);
    if (!userData.id) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to generate ID"
      );
    }

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    studentData.user = newUser[0]._id;
    studentData.id = newUser[0].id;
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();
    return { user: newUser[0], student: newStudent[0] };
  } catch (error) {
    console.log((error as { message: string | null }).message);
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const userServices = {
  createStudentInDB,
};
