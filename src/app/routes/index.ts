import express from "express";
import studentRouter from "../modules/student/student.route";
import userRouter from "../modules/user/user.routes";
import academicFacultyRouter from "../modules/academicFaculty/academicFaculty.route";

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/students",
    route: studentRouter,
  },
  {
    path: "/academicFaculty",
    route: academicFacultyRouter,
  },
];

routes.map((route) => router.use(route.path, route.route));

export default router;
