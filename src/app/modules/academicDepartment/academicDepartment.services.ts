// import mongoose from "mongoose";
import httpStatus from "http-status";
import { AppError } from "../../errors/appError";
import AcademicFaculty from "../academicFaculty/academicFaculty.model";
import { TacademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TacademicDepartment) => {
  const { academicFaculty } = payload;

  const existingAcademicFaculty = await AcademicFaculty.findById(academicFaculty);
  if (!existingAcademicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic faculty do not exists");
  }
  const newAcademicDepartment = await AcademicDepartment.create(payload);
  return newAcademicDepartment;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
};
