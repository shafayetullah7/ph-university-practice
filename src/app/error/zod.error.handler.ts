import { ZodError } from "zod";
import { Terror, TerrorSource } from "./error.interface";
import config from "../config";

const handleZodError = (err: ZodError): Terror => {
  const error: Terror = {
    success: false,
    statusCode:400,
    message: "Validation error",
    errorSources: [], 
    stack: config.NODE_ENV === "development" ? (err.stack as string) : null,
  };

  error.errorSources = err.issues.map(
    (issue): TerrorSource => ({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    })
  );
  return error;
};

export default handleZodError;
