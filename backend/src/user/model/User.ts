import { UserRole } from './UserRole'
import { prop } from '@typegoose/typegoose'
import { IPersonalData } from './IPersonalData'
import {
  AuthenticationData,
  IAuthenticationData,
} from '../../authenticationdata/model/AuthenticationData'

export interface IUser {
  _id?: string
  authenticationData?: IAuthenticationData
  personalData?: IPersonalData
  roles?: UserRole[]
}

export class User implements IUser {
  _id?: string

  @prop({ type: () => AuthenticationData })
  authenticationData?: AuthenticationData

  @prop()
  personalData?: IPersonalData

  @prop({ type: () => [String] })
  roles?: UserRole[]
}
