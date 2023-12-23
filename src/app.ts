import express, { Application, Request, Response } from "express";
import cors from "cors";

import { globalErrorHandler } from "./app/error/globlaErrorHandler";
import { routeNotFoundHandler } from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/", router);

// Global error handler
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

app.use(globalErrorHandler);
app.use(routeNotFoundHandler);

export default app;
