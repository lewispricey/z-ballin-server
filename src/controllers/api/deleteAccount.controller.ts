import removeAccount from "../../models/api/removeAccount";
import Controller from "../controller.type";

const deleteAccount: Controller = (request, response, next) => {
  const userId = Number(request.headers.userId) || -0;
  const { accountId } = request.params;
  removeAccount(accountId, userId)
    .then(() => {
      response.status(204).send();
    })
    .catch(next);
};

export default deleteAccount;
