import { UserRole } from './UserRole'
import { BaseModel, HasOne, Property } from '../../lib/frontmodel'
import { UserValidator } from './UserValidator'
import {
  AuthenticationData,
  IAuthenticationData
} from './authenticationdata/AuthenticationData'
import { IPersonalData, PersonalData } from './personaldata/PersonalData'

export interface IUser {
  _id?: string
  authenticationData?: IAuthenticationData
  personalData?: IPersonalData
  roles?: UserRole[]
}

export class User extends BaseModel implements IUser {
  @Property
  _id?: string

  @HasOne(() => AuthenticationData)
  authenticationData?: AuthenticationData

  @HasOne(() => PersonalData)
  personalData?: PersonalData

  @Property
  roles?: UserRole[]

  get validator(): UserValidator {
    return (this._validator ??= new UserValidator(this))
  }
}
