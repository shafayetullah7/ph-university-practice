import { Request, Response } from "express";
import { studentService } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const {student} = req.body;
    // console.log(student);
    const newStudent = await studentService.insertStudentIntoDB(student);
    res.status(200).json({success:true,message:'New student created',data:newStudent});
  } catch (error) {
    res.status(500).json({success:false,message:(error as {message:string}).message})
  }
};

export const studentController = {
    createStudent
}
