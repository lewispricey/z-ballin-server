import express, { Router } from "express";
import getCategories from "../controllers/api/getCategories.controller";
import getAccounts from "../controllers/api/getAccounts.controller";
import postAccount from "../controllers/api/postAccount.controller";

const apiRouter: Router = express.Router();

apiRouter.get("/categories", getCategories);
apiRouter.get("/accounts", getAccounts);
apiRouter.post("/accounts", postAccount);

export default apiRouter;
