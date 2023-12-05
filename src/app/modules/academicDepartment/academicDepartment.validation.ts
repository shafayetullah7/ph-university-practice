import { z } from "zod";

const academicDepartmentValidationSchema = z.object({
  name: z.string({
    required_error: "Department name is required",
    invalid_type_error: "Department name must be string",
  }),
  academicFaculty: z.string({
    required_error: "Academic faculty is required",
    invalid_type_error: "Academic faculty reference must be string",
  }),
});

const createAcademicDepartmentValidation = z.object({
    body:z.object({
        academicDepartment:academicDepartmentValidationSchema
    })
})

export const academicDepartmentValidation = {
    createAcademicDepartmentValidation
}
