import { Schema } from "mongoose";

export type TacademicDepartment = {
    name:string;
    academicFaculty:Schema.Types.ObjectId;
    isDeleted?:boolean;
}

