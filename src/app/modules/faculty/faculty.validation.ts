import { z } from "zod";

export const FacultyValidationSchema = z.object({
  designation: z.string({
    required_error: "Designation is required",
    invalid_type_error: "Designation must be a string",
  }),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be 'male' or 'female'",
  }),
  dob: z.string({
    required_error: "Date of birth is required",
    invalid_type_error: "Date of birth must be a string",
  }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email address",
    })
    .email(),
  contact: z.string({
    required_error: "Contact is required",
    invalid_type_error: "Contact must be a string",
  }),
  emergencyContact: z.string({
    required_error: "Emergency contact is required",
    invalid_type_error: "Emergency contact must be a string",
  }),
  presentAddress: z.string({
    required_error: "Present address is required",
    invalid_type_error: "Present address must be a string",
  }),
  permanentAddress: z.string({
    required_error: "Permanent address is required",
    invalid_type_error: "Permanent address must be a string",
  }),
  profileImage: z.string({
    required_error: "Profile image is required",
    invalid_type_error: "Invalid URL for profile image",
  }),
  status: z.string({
    required_error: "Status is required",
    invalid_type_error: "Status must be a string",
  }),
  academicDepartment: z.string({
    required_error: "Academic department is required",
    invalid_type_error: "Academic department must be a string",
  }),
  academicFaculty: z.string({
    required_error: "Academic semester is required",
    invalid_type_error: "Academic semester must be a string",
  }),
});

export const facultyValidation = {
  FacultyValidationSchema,
};
