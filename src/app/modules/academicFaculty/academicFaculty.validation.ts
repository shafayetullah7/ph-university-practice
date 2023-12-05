import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  name: z
    .string({
      required_error: "Academic faculty name is required",
      invalid_type_error: "Academic faculty name must be string",
    })
    .max(50, "Academic faculty name cannot be more than 50 chars"),
});

const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    academicFaculty: academicFacultyValidationSchema,
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    academicFaculty: academicFacultyValidationSchema.optional(),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema
};
