import mongoose, { Schema } from "mongoose";
import { Tguardian, Tstudent } from "./student.interface";

const guardianSchema = new mongoose.Schema<Tguardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contact: { type: String, required: true },
});

const studentSchema = new mongoose.Schema<Tstudent>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    dob: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: guardianSchema, required: true },
    localGuardian: { type: guardianSchema, required: true },
    profileImage: { type: String, required: true },
    academicDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    academicSemester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
