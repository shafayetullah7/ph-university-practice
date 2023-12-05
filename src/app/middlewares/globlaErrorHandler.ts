/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  console.log(err.message);
  return res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
    error: err,
  });
};
