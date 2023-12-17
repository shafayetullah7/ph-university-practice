import mongoose from "mongoose";
import { Terror, TerrorSource } from "./error.interface";
import config from "../config";

export const handleMongooseValidationError = (
  err: mongoose.Error.ValidationError
):Terror => {
  const filteredError: Terror = {
    success: false,
    statusCode: 400,
    message: "Validation error",
    errorSources: [],
    stack: config.NODE_ENV === "development" && err.stack ? err.stack : null,
  };

  filteredError.errorSources = Object.values(err.errors).map(
    (e): TerrorSource => {
      return {
        path: e.path,
        message: e.message,
      };
    }
  );

  return filteredError;
};
