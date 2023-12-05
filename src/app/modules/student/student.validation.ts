import { z } from "zod";
// import { Tguardian } from "./student.interface";

const guardianValidationSchema = z.object({
  name: z.string({
    required_error: "Guardian name is required",
    invalid_type_error: "Guardian name must be string",
  }),
  occupation: z.string({
    required_error: "Guardian occupation is required",
    invalid_type_error: "Guardian occupation must be string",
  }),
  contact: z.string({
    required_error: "Guardian contact is required",
    invalid_type_error: "Guardian contact must be string",
  }),
});

const studentValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be string",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "id is required",
    invalid_type_error: "id must be string",
  }),
  dob: z.string({
    required_error: "Date of birth is required",
    invalid_type_error: "Date of birth must be string",
  }),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email must be string",
  }),
  contact: z.string({
    required_error: "Contact number is required",
    invalid_type_error: "Contact number must be string",
  }),
  emergencyContact: z.string({
    required_error: "Emergency contact number is required",
    invalid_type_error: "Emergency Contact number must be string",
  }),
  presentAddress: z.string({
    required_error: "Present address is required",
    invalid_type_error: "Present address must be string",
  }),
  permanentAddress: z.string({
    required_error: "Permanent address is required",
    invalid_type_error: "Permanent address must be string",
  }),
  guardian: guardianValidationSchema,
  localGuardian: guardianValidationSchema,
  profileImage: z.string({
    required_error: "Profile image is required",
    invalid_type_error: "Profile image must be string",
  }),
  academicDepartment: z.string({
    required_error: "Academic department is required",
    invalid_type_error: "Academic department must be string",
  }),
});

export const studentValidation = {
  guardianValidationSchema,
  studentValidationSchema,
};
