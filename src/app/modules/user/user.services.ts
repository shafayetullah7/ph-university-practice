// import { Tstudent } from "../student/student.interface";
import { Tstudent } from "../student/student.interface";
import Student from "../student/student.model";
import { Tuser } from "./user.interfact";
import User from "./user.model";

const createStudentInDB = async (userData: Tuser, studentData: Tstudent) => {
  if (await User.userExists(userData.id)) {
    throw new Error("User already exists with this id");
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
