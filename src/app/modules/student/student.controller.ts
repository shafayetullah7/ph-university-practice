import { Request, RequestHandler, Response } from "express";
import { studentService } from "./student.service";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    // console.log(student);
    const newStudent = await studentService.insertStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: "New student created",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as { message: string }).message,
    });
  }
};

const getStudents: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query;
  const students = await studentService.getAllStudentsFromDB(query);
  res.status(httpStatus.OK).json({
    success: true,
    message: "Students retrived",
    data: students,
  });
});

export const studentController = {
  createStudent,
  getStudents,
};
