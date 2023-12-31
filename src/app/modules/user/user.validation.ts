import { z } from "zod";
import { studentValidation } from "../student/student.validation";
import { facultyValidation } from "../faculty/faculty.validation";

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .max(20, "Password cannot be more than 20 characters")
    .optional(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ invalid_type_error: "Password must be string" })
      .optional(),
    student: studentValidation.studentValidationSchema,
  }),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ invalid_type_error: "Password must be string" })
      .optional(),
    faculty: facultyValidation.FacultyValidationSchema,
  }),
});

export const userValidation = {
  userValidationSchema,
  createStudentValidationSchema,
  createFacultyValidationSchema,
};
