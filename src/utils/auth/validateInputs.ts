export const validateEmail: (email: string) => boolean = (email: string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

export const validatePassword: (password: string) => boolean = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateInputs = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    if (!validateEmail(email) || !validatePassword(password)) {
      return reject({ code: 400, msg: "invalid email" });
    }
    resolve(true);
  });
};

export default validateInputs;
