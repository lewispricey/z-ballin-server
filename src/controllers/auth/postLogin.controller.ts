import login from "../../models/auth/login.model";
import Controller from "../controller.type";

interface postBody {
  email: string;
  password: string;
}

const postLogin: Controller = (request, response, next) => {
  const { email, password }: postBody = request.body;
  login(email, password)
    .then((token) => {
      response.status(200).send(token);
    })
    .catch((err) => {
      next({ code: 400, msg: "invalid email or password" });
    });
};

export default postLogin;
