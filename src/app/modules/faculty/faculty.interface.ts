import { Types } from "mongoose";

export type Tfaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: string;
  gender: "male" | "female";
  dob: string;
  email: string;
  contact: string;
  emergencyContact: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  status: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};
