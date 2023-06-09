import express, { Application, Request, Response } from "express";
import apiRouter from "./routers/api.router";

const app: Application = express();

app.use(express.json());

app.use("/api", apiRouter);

export default app;
