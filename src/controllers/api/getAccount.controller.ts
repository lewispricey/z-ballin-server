import selectAccount from "../../models/api/selectAccount";
import Controller from "../controller.type";

const getAccount: Controller = (request, response, next) => {
  const userId = Number(request.headers.userId) || -0;
  const { accountId } = request.params;
  selectAccount(accountId, userId)
    .then((account) => {
      response.status(200).send({ account });
    })
    .catch(next);
};

export default getAccount;
