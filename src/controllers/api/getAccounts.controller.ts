import selectAccounts from "../../models/api/selectAccounts";
import Controller from "../controller.type";

const getAccounts: Controller = (request, response, next) => {
  const userId = Number(request.headers.userId) || -0;

  selectAccounts(userId).then((accounts) => {
    response.status(200).send({ accounts });
  });
};

export default getAccounts;
