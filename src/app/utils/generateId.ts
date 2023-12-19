import { Types } from "mongoose";
import { AcademicSemester } from "../modules/academicSemester/academicSemester.model";
import { AppError } from "../errors/appError";
import httpStatus from "http-status";
import Student from "../modules/student/student.model";

const generateId = async (semesterId: Types.ObjectId) => {
  const semester = await AcademicSemester.findById(semesterId);
  if (!semester) {
    throw new AppError(httpStatus.BAD_REQUEST, "Academic semester not found");
  }
  const [lastStudent] = await Student.find({
    academicSemester: semester._id,
  })
    .sort({ createdAt: -1 })
    .limit(1);

  let newId = "";
  if (!lastStudent) {
    newId = `${semester.year.toString()}-${semester.code}-${"0".repeat(3)}1`;
  } else {
    const studentID = (parseInt(lastStudent.id.split("-")[2]) + 1).toString();
    newId = `${semester.year.toString()}-${semester.code}-${"0".repeat(
      4 - studentID.length
    )}${studentID}`;
  }
  return newId;
};



export default generateId;
