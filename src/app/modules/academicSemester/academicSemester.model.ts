import mongoose from "mongoose";
import { TacademicSemester } from "./academicSemester.interface";
import {
  months,
  semesterCodes,
  semesterNames,
} from "./academicSemester.validation";

const academicSemesterSchema = new mongoose.Schema<TacademicSemester>({
  name: {
    type:String,
    enum: semesterNames,
    required: true,
  },
  code: {
    type:String,
    enum: semesterCodes,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  startMonth: {
    type: String,
    enum: months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: months,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "not-active"],
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const AcademicSemester = mongoose.model<TacademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
