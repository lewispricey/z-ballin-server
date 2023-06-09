import express, { Router } from "express";
import postRegister from "../controllers/auth/postRegister.controller";
import postLogin from "../controllers/auth/postLogin.controller";

const authRouter: Router = express.Router();

authRouter.post("/register", postRegister);
authRouter.post("/login", postLogin);

export default authRouter;
