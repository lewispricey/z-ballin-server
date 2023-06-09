import express, { Router } from "express";
import authRouter from "./auth.subrouter";
import customError from "../errors/customError";

const apiRouter: Router = express.Router();

// sub routers
apiRouter.use("/auth", authRouter);

// error handling middleware
apiRouter.use(customError);

export default apiRouter;
