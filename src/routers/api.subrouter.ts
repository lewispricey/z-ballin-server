import express, { Router } from "express";
import getCategories from "../controllers/api/getCategories.controller";

const apiRouter: Router = express.Router();

apiRouter.get("/categories", getCategories);

export default apiRouter;
