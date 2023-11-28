import { Tstudent } from "./student.interface";
import studentModel from "./student.model";

const insertStudentIntoDB = async(student:Tstudent) =>{
    const newStudent = await studentModel.create(student);
    return newStudent;
}

export const studentService = {
    insertStudentIntoDB
}