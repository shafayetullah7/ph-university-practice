import httpStatus from "http-status";
import { AppError } from "../../errors/appError";
import {
  TacademicSemester,
  TsemesterCode,
  TsemesterName,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import { semesterCodes, semesterNames } from "./academicSemester.validation";

const createAcademicSemesterInotDB = async (payload: TacademicSemester) => {
  const { name, code, year } = payload;
  const semesters: Map<TsemesterName, TsemesterCode> = new Map();
  semesterNames.forEach((name: TsemesterName, idx) => {
    semesters.set(name, semesterCodes[idx]);
  });
  if (semesters.get(name) !== code) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Semester name do not match semester code"
    );
  }
  const existingSemester = await AcademicSemester.findOne({ year, code });
  if (existingSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, "This semester already exists");
  }
  const newAcademicSemester = await AcademicSemester.create(payload);
  return newAcademicSemester;
};

export const academicSemesterServices = {
  createAcademicSemesterInotDB,
};
