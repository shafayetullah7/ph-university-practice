import { Types } from "mongoose";

export type Tguardian = {
  name: string;
  occupation: string;
  contact: string;
};

export type Tstudent = {
  id: string;
  user: Types.ObjectId;
  name: string;
  gender: "male" | "female";
  dob: string;
  email: string;
  contact: string;
  emergencyContact: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Tguardian;
  localGuardian: Tguardian;
  profileImage: string;
  academicDepartment: string;
  isDeleted: boolean;
};
