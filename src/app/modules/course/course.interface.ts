import { Types } from "mongoose";

export type TpreRequisites = {
  course: Types.ObjectId;
  isDeleted?: boolean;
};

export type Tcourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TpreRequisites[];
  isDeleted: false;
};
