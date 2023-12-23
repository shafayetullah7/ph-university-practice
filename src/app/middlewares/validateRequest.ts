import { AnyZodObject } from "zod";
import { AppError } from "../errors/appError";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

export const validateRequest = (schema: AnyZodObject) => {
  if (!schema) {
    throw new AppError(httpStatus.NOT_FOUND, "Schema not found");
  }
  return catchAsync(async (req, res, next) => {
    console.log("validating");
    await schema.parseAsync({ body: req.body, cookies: req.cookies });
    console.log("validated");
    next();
  });
};
