import mongoose from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new mongoose.Schema<TacademicDepartment>({
  name: {
    type: String,
    required: true,
  },
  academicFaculty: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});


export const AcademicDepartment = mongoose.model<TacademicDepartment>('AcademicDepartment',academicDepartmentSchema);