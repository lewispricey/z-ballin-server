import express, { Router } from "express";
import postRegister from "../controllers/auth/postRegister";

const authRouter: Router = express.Router();

authRouter.post("/register", postRegister);

export default authRouter;
