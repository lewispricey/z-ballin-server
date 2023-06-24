import express, { Router } from "express";
import authRouter from "./auth.subrouter";
import customError from "../errors/customError";
import apiRouter from "./api.subrouter";
import authenticateToken from "../middleware/authenticateToken";
import psqlError from "../errors/psqlError";

const appRouter: Router = express.Router();

// sub routers
appRouter.use("/auth", authRouter);
appRouter.use("/api", authenticateToken, apiRouter);
// error handling middleware
appRouter.use(psqlError);
appRouter.use(customError);

export default appRouter;
