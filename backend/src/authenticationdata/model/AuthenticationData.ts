import {prop} from "@typegoose/typegoose";

export interface IAuthenticationData {
  id?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class AuthenticationData {

  @prop()
  email?: string

  @prop()
  password?: string

  passwordConfirmation?: string
}
