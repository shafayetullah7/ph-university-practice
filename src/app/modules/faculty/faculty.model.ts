import mongoose from "mongoose";
import { Tfaculty } from "./faculty.interface";

const facultySchema = new mongoose.Schema<Tfaculty>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    emergencyContact: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    academicFaculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Faculty = mongoose.model<Tfaculty>("Faculty", facultySchema);

export default Faculty;
