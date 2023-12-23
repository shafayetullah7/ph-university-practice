/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constants";

export interface Tuser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "admin" | "student" | "faculty";
  status?: "in-progress" | "blocked";
  isDeleted?: boolean;
}

export interface UserModel extends Model<Tuser> {
  // eslint-disable-next-line no-unused-vars
  userExists(id: string): Promise<Tuser | null>;
  passwordMatched(password: string, hashedPassword: string): Promise<boolean>;
}

export type TuserRole = keyof typeof USER_ROLE;
