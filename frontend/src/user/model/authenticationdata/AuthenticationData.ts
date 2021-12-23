import { BaseModel, Property } from '../../../lib/frontmodel'
import { AuthenticationDataValidator } from './AuthenticationDataValidator'

export interface IAuthenticationData {
  _id?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class AuthenticationData extends BaseModel {
  @Property
  _id?: string

  @Property
  email?: string

  @Property
  password?: string

  @Property
  passwordConfirmation?: string

  get validator(): AuthenticationDataValidator {
    return (this._validator ??= new AuthenticationDataValidator(this))
  }
}
