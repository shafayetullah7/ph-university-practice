import { Types } from "mongoose";

export type TcourseTeacher = {
  teacher: Types.ObjectId;
  isDeleted: boolean;
};

export type TcourseFaculty = {
  course: Types.ObjectId;
  courseTeachers: TcourseTeacher[];
  isDeleted: boolean;
};
