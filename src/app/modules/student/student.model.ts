import mongoose from "mongoose";
import { Tguardian, Tstudent, Tusername } from "./student.interface";

const usernameSchema = new mongoose.Schema<Tusername>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const guardianSchema = new mongoose.Schema<Tguardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const studentSchema = new mongoose.Schema<Tstudent>({
  username: {
    type:usernameSchema,
    required:[true,'Name must be provided']
  },
  gender: {
    type: String,
    enum: {
      values:["male", "female"],
      message:'{VALUE} is not valid gender'
    },
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
  blood: {
    type: String,
    enum: {
      values:["A+", "A-", "B+", "B-", "AB+", "ab-", "O+", "O-"],
      message:'{VALUE} is not valid'
    },
    required: true,
  },
  guardian:guardianSchema
},{timestamps:true});

const studentModel = mongoose.model<Tstudent>('Student',studentSchema);
export default studentModel;