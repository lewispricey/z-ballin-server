import express, { Router } from "express";
import getCategories from "../controllers/api/getCategories.controller";
import getAccounts from "../controllers/api/getAccounts.controller";

const apiRouter: Router = express.Router();

apiRouter.get("/categories", getCategories);
apiRouter.get("/accounts", getAccounts);

export default apiRouter;
