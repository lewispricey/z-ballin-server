import insertAccount from "../../models/api/insertAccount";
import Controller from "../controller.type";

const postAccount: Controller = (request, response, next) => {
  const userId = Number(request.headers.userId) || -0;
  const newAccount = request.body;
  insertAccount(userId, newAccount)
    .then((account) => {
      response.status(201).send({ account });
    })
    .catch(next);
};

export default postAccount;
