import bcrypt, { genSalt } from "bcrypt";
import User from "../models/user";
export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enternalPassword: string,
  savedPassword: string,
  savedSalt: string
) => {
  return (
    (await GeneratePassword(enternalPassword, savedSalt)) === savedPassword
  );
};
