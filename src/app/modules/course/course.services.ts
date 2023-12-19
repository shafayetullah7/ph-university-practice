import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { Tcourse } from "./course.interface";
import Course from "./course.model";

const createCourseIntoDB = async (payload: Tcourse) => {
  const newCourse = await Course.create(payload);
  return newCourse;
};

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const coursQuery = new QueryBuilder(Course.find({ isDeleted: false }), query)
    .filter()
    .paginate();

  const result = await coursQuery.queryModel
    .find()
    .populate("preRequisiteCourses");
  return result;
};

const getCourseFromDB = async (id: string) => {
  const course = await Course.findOne({
    _id: new mongoose.Schema.Types.ObjectId(id),
    isDeleted: false,
  });
  return course;
};

const updateCourseIntoDB = async (id: string, payload: Partial<Tcourse>) => {
  const { preRequisiteCourses, ...rest } = payload;
  const addPreRequisites =
    preRequisiteCourses?.filter((p) => p.isDeleted === false) || [];
  const deletePreRequisites =
    preRequisiteCourses
      ?.filter((p) => p.isDeleted === true)
      .map((p) => p.course) || [];
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      $set: rest,
      $pull: { preRequisiteCourses: { course: { $in: deletePreRequisites } } },
      $addToSet: { preRequisiteCourses: addPreRequisites },
    },
    { new: true }
  );
  return updatedCourse;
};

export const courseServices = {
  createCourseIntoDB,
  getCourseFromDB,
  getCoursesFromDB,
  updateCourseIntoDB,
};
