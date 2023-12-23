import mongoose from "mongoose";
import { TcourseFaculty } from "./courseFaculty.interface";
import CourseFaculty from "./courseFaculty.model";

const assignCourseIntoDB = async (payload: TcourseFaculty) => {
  const deleteTeacher = payload?.courseTeachers
    ?.filter((ct) => ct.isDeleted === true)
    .map((ct) => ct.teacher);
  const addTeacher = payload?.courseTeachers?.filter(
    (ct) => ct.isDeleted === false
  );
  const courseFaculty = await CourseFaculty.findOneAndUpdate(
    { course: new mongoose.Types.ObjectId(payload.course) },
    {
      $addToSet: addTeacher,
      $pull: { courseTeachers: { teacher: { $in: deleteTeacher } } },
    },
    { upsert: true }
  );
  return courseFaculty;
};

export const courseFacultyServices = {
  assignCourseIntoDB,
};
