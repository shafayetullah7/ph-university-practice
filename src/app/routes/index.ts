import express from "express";
import studentRouter from "../modules/student/student.route";
import userRouter from "../modules/user/user.routes";
import academicFacultyRouter from "../modules/academicFaculty/academicFaculty.route";
import academicDepartmentRouter from "../modules/academicDepartment/academicDepartment.route";
import academicSemesterRouter from "../modules/academicSemester/academicSemester.route";
import facultyRouter from "../modules/faculty/faculty.routes";

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
  {
    path: "/academicDepartment",
    route: academicDepartmentRouter,
  },
  {
    path: "/academicSemester",
    route: academicSemesterRouter,
  },
  {
    path: "/faculty",
    route: facultyRouter,
  },
];

routes.map((route) => router.use(route.path, route.route));

export default router;
