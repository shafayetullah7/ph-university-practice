import { z } from "zod";
import {
  Tmonth,
  TsemesterCode,
  TsemesterName,
} from "./academicSemester.interface";

export const months: Tmonth[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const semesterNames: TsemesterName[] = ["Spring", "Summer", "Fall"];

export const semesterCodes: TsemesterCode[] = ["01", "02", "03"];

const academicSemesterValidationSchema = z.object({
  name: z.enum([...semesterNames] as [string, ...string[]]),
  code: z.enum([...semesterCodes] as [string, ...string[]]),
  year: z
    .number({
      required_error: "Year is required",
      invalid_type_error: "Year must be a number",
    })
    .min(1990, "Year cannot be less than 1990")
    .max(2100, "Year cannot be more than 2100"),
  startMonth: z.enum([...months] as [string, ...string[]]),
  endMonth: z.enum([...months] as [string, ...string[]]),
});

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    academicSemester: academicSemesterValidationSchema,
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
