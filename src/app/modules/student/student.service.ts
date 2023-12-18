import QueryBuilder from "../../builder/QueryBuilder";
import { Tstudent } from "./student.interface";
import Student from "./student.model";
import studentModel from "./student.model";

const insertStudentIntoDB = async (student: Tstudent) => {
  const newStudent = await studentModel.create(student);
  return newStudent;
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //   const queryObj = { ...query };
  //   let searchTerm = "";

  //   if (query.searchTerm) {
  //     searchTerm = queryObj?.searchTerm as string;
  //   }
  //   const searchQuery = Student.find({
  //     $or: ["name", "email"].map((field) => ({
  //       [field]: { $regex: searchTerm, $options: "i" },
  //     })),
  //   });

  //   const exclude = ["searchTerm", "sort"];
  //   exclude.forEach((el) => delete queryObj[el]);

  //   console.log(query, queryObj);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate({
  //     path: "academicSemester",
  //     select: "-__v",
  //   })
  //   .populate({
  //     path: "academicDepartment",
  //     select: "-__v",
  //     populate: { path: "academicFaculty", select: "-__v" },
  //   });

  //   const sort = (query.sort as string) || "-createdAt";

  //   const sortQuery = await filterQuery.find().sort(sort);

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(["name", "email"])
    .filter()
    .sort()
    .paginate();

  const result = await studentQuery.queryModel
    .find()
    .populate({
      path: "academicSemester",
      select: "-__v",
    })
    .populate({
      path: "academicDepartment",
      select: "-__v",
      populate: { path: "academicFaculty", select: "-__v" },
    });
  return result;
};

export const studentService = {
  insertStudentIntoDB,
  getAllStudentsFromDB,
};
