/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { Terror } from "./error.interface";
import { ZodError } from "zod";
import handleZodError from "./zod.error.handler";
import { handleMongooseValidationError } from "./mongoose.error";
import { handleCastError } from "./cast.error.handler";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  // let statusCode = err.statusCode || 500;
  // let message = err.message || "Something went wrong";
  // let errorSources: TerrorSource[] = [
  //   {
  //     path: "Default path",
  //     message: "Default message",
  //   },
  // ];
  console.log(err.message);
  let error: Terror = {
    success: false,
    statusCode: 500,
    message: err.message || "Something went wrong",
    errorSources: [],
    stack: null,
  };
  if (err instanceof ZodError) {
    error = handleZodError(err);
  } else if (err.name === "ValidationError") {
    error = handleMongooseValidationError(err);
  }
  if (err?.name === "CastError") {
    error = handleCastError(err);
  } else {
    error.error = err;
  }
  return res.status(error.statusCode).json(error);
};

// pattern
/*
success
message
errorSources:[
  {
    path:'',
    message:'',
  }
]
stack

*/
