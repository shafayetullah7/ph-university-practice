// import { Tstudent } from "../student/student.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Tstudent } from "../student/student.interface";
import Student from "../student/student.model";
import { Tuser } from "./user.interfact";
import User from "./user.model";

const createStudentInDB = async (userData: Tuser, studentData: Tstudent) => {
  const semester = await AcademicSemester.findById(
    studentData.academicSemester
  );
  if (!semester) {
    throw new Error("Academic semester not found");
  }
  const [lastStudent] = await Student.find({
    academicSemester: semester._id,
  })
    .sort({ createdAt: -1 })
    .limit(1);

  if (!lastStudent) {
    userData.id =`${semester.year.toString()}-${semester.code}-${"0".repeat(3)}1`;
  } else {
    const studentID = (parseInt(lastStudent.id.split('-')[2]) + 1).toString();
    userData.id =`${semester.year.toString()}-${semester.code}-${"0".repeat(4 - studentID.length)}${studentID}`;
  }

  const newUser = await User.create(userData);

  studentData.user = newUser._id;
  studentData.id = newUser.id;
  const newStudent = await Student.create(studentData);
  // console.log(studentData);
  return { user: newUser, student: newStudent };
};

export const userServices = {
  createStudentInDB,
};
