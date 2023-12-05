import { Model } from "mongoose";

export type TacademicFaculty = {
  name: string;
  isDeleted?: boolean;
};

export interface AcademicFacultyModel extends Model<TacademicFaculty>{
    academicFacultyExists(name:string):Promise<TacademicFaculty | null>
}