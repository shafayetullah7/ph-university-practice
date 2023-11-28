import express from 'express';
import { studentController } from "./student.controller";

const studentRouter = express.Router();

studentRouter.post('/',studentController.createStudent);

export default studentRouter;