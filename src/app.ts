import express, { Application, Request, Response } from "express";
import appRouter from "./routers/app.router";

const app: Application = express();

app.use(express.json());

app.use("/", appRouter);

export default app;
