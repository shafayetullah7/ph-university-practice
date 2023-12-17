import mongoose from "mongoose";
import {
  TacademicFaculty,
  AcademicFacultyModel,
} from "./academicFaculty.interface";
import { AppError } from "../../errors/appError";
import httpStatus from "http-status";

const academicFacultySchema = new mongoose.Schema<
  TacademicFaculty,
  AcademicFacultyModel
>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

academicFacultySchema.static("academicFacultyExists", async (name: string) => {
  try {
    const academicFaculty = await AcademicFaculty.findOne({ name });
    return academicFaculty ? academicFaculty : null;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
});

academicFacultySchema.pre("save", async function (next) {
  if (await AcademicFaculty.academicFacultyExists(this.name)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${this.name} academic faculty already exists`
    );
  } else {
    next();
  }
});

academicFacultySchema.pre("findOneAndUpdate", async function (next) {
  try {
    const { id } = this.getQuery();
    const academicFaculty = AcademicFaculty.findById(id);
    if (!academicFaculty) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        "This academic faculty does not exist"
      );
    } else {
      next();
    }
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
});

const AcademicFaculty = mongoose.model<TacademicFaculty, AcademicFacultyModel>(
  "AcademicFaculty",
  academicFacultySchema
);
export default AcademicFaculty;
