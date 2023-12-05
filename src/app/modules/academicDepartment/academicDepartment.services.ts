import AcademicFaculty from "../academicFaculty/academicFaculty.model";
import { TacademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TacademicDepartment) => {
  const { academicFaculty } = payload;
  const existingAcademicFaculty = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!existingAcademicFaculty) {
    throw new Error("Academic faculty do not exists");
  }
  const newAcademicDepartment = await AcademicDepartment.create(
    academicFaculty
  );
  return newAcademicDepartment;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
};