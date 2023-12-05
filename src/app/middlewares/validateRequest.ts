import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
  if (!schema) {
    throw new Error("Schema not found");
  }
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("validating");
      await schema.parseAsync({ body: req.body });
      console.log("validated");
      next();
    } catch (error) {
      console.log("failed to validate via zod");
      next(error);
    }
  };
};
