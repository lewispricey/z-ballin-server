import selectCategories from "../../models/api/selectCategories";
import Controller from "../controller.type";

const getCategories: Controller = (request, response, next) => {
  const expenseQuery = request.query.isExpense;

  const isExpense =
    expenseQuery === undefined ? true : expenseQuery === "true" ? true : false;

  selectCategories(isExpense)
    .then((categories) => {
      response.status(200).send({ categories });
    })
    .catch(next);
};

export default getCategories;
