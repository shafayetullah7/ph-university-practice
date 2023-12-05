import mongoose from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new mongoose.Schema<TacademicDepartment>({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  academicFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'AcademicFaculty',
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});



export const AcademicDepartment = mongoose.model<TacademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
