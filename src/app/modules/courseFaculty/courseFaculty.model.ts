import mongoose from "mongoose";
import { TcourseFaculty, TcourseTeacher } from "./courseFaculty.interface";

const courseTeacherSchema = new mongoose.Schema<TcourseTeacher>(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Faculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const courseFacultySchema = new mongoose.Schema<TcourseFaculty>({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  courseTeachers: {
    type: [courseTeacherSchema],
    default: [],
  },
});

const CourseFaculty = mongoose.model<TcourseFaculty>(
  "CourseFaculty",
  courseFacultySchema
);

export default CourseFaculty;
