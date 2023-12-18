import mongoose from "mongoose";
import { Terror } from "./error.interface";
import config from "../config";

export const handleCastError = (err: mongoose.Error.CastError): Terror => {
  const error: Terror = {
    success: false,
    statusCode: 400,
    message:'Invalid ID',
    errorSources: [
      {
        path: err.path,
        message: err.message,
      },
    ],
    stack: config.NODE_ENV === "development" ? err.stack || null : null,
  };
  return error;
};
