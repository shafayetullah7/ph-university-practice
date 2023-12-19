import express from "express";
import { facultyController } from "./faculty.controller";
const facultyRouter = express.Router();

facultyRouter.get('/',facultyController.getFaculties);

export default facultyRouter;
