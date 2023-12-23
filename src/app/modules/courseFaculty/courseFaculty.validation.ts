import { z } from "zod";

const courseTeacherValidationTeacher = z.object({
  teacher: z.string({
    required_error: "Teacher is required",
    invalid_type_error: "Teacher must be string",
  }),
  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be boolean" })
    .optional(),
});

const courseFacultyValidationSchema = z.object({
  course: z.string({
    required_error: "Course ID is required",
    invalid_type_error: "Course ID must be string",
  }),
  teacher: courseTeacherValidationTeacher.array(),
});

const createdCourseFacultyValidationSchema = z.object({
  body: z.object({
    courseFaculty: courseFacultyValidationSchema,
  }),
});

export const courseFacultyValidation = {
  createdCourseFacultyValidationSchema,
};
