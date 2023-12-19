import mongoose from "mongoose";
import Faculty from "./faculty.model";
import { Tfaculty } from "./faculty.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find({ isDeleted: false }),
    query
  )
    .filter()
    .paginate();

  const result = await facultyQuery.queryModel
    .find()
    .populate("academicDepartment")
    .populate("academicFaculty");
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const faculty = await Faculty.findOne({
    _id: new mongoose.Schema.Types.ObjectId(id),
    isDeleted: false,
  });
  return faculty;
};

const deleteFacultyFromDB = async (id: string) => {
  const faculty = await Faculty.findOneAndUpdate(
    {
      _id: new mongoose.Schema.Types.ObjectId(id),
      isDeleted: false,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    { new: true }
  );
  return faculty;
};

const updateFacultyIntoDB = async (id: string, payload: Partial<Tfaculty>) => {
  const faculty = await Faculty.findOneAndUpdate(
    {
      _id: new mongoose.Schema.Types.ObjectId(id),
      isDeleted: false,
    },
    {
      $set: payload,
    },
    { new: true }
  );
  return faculty;
};

export const facultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  deleteFacultyFromDB,
  updateFacultyIntoDB,
};
