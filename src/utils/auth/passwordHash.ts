import argon2 from "argon2";

export const hashPassword = (password: string) => {
  const hashOptions = {
    hashLength: 32,
    timeCost: 12,
  };

  return argon2.hash(password, hashOptions);
};

export const verifyPassword = (password: string, hash: string) => {
  return argon2.verify(hash, password);
};
