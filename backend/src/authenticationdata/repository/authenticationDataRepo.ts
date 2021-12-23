import { AuthenticationData } from "../model/AuthenticationData";
import { getModelForClass } from "@typegoose/typegoose";

const authenticationDataTable = getModelForClass(AuthenticationData);

export const authenticationDataRepo_create = async (
  authenticationData: AuthenticationData
) => {
  return authenticationDataTable.create(authenticationData);
};

export const authenticationDataRepo_findByEmail = async (email: string) => {
  return authenticationDataTable.findOne({
    email,
  });
};
