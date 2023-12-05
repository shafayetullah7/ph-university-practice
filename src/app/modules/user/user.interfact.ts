import { Model } from "mongoose";

export type Tuser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty';
    status?: 'in-progress' | 'blocked';
    isDeleted?: boolean;
}

export interface UserModel extends Model<Tuser>{
    // eslint-disable-next-line no-unused-vars
    userExists(id:string):Promise<Tuser | null>;
}

