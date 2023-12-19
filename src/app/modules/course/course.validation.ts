import { z } from "zod";

const courseValidationSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be string",
  }),
  prefix: z.string({
    required_error: "Prefix is required",
    invalid_type_error: "Prefix must be string",
  }),
  code: z.number({
    required_error: "Code is required",
    invalid_type_error: "Code must be a number",
  }),
  credits: z.number({
    required_error: "Credits are required",
    invalid_type_error: "Credits must be a number",
  }),
  preRequisiteCourses: z
    .string({ invalid_type_error: "Pre requisite course must be string" })
    .array(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    course: courseValidationSchema,
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    course: courseValidationSchema.deepPartial(),
  }),
});

export const courseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
