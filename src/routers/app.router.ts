import express, { Router } from "express";
import authRouter from "./auth.subrouter";
import customError from "../errors/customError";

const appRouter: Router = express.Router();

// sub routers
appRouter.use("/auth", authRouter);

// error handling middleware
appRouter.use(customError);

export default appRouter;
