import { UserRole } from './UserRole'
import {
  BaseModel,
  HasOne,
  ModelValidator,
  Property
} from '../../lib/frontmodel'
import { UserValidator } from './UserValidator'
import { Address, IAddress } from '../../address/model/Address'

export class AuthenticationDataValidator extends ModelValidator<
  AuthenticationData,
  'default'
> {
  validateCreateAccount = () => {
    this.email()
    this.password()
    this.passwordConfirmation()
  }

  validateLogin = () => {
    this.email()
    this.password()
  }

  email = () => {
    if (!this.validatable.email) {
      this.addError('email', 'must be filled')
      return
    }
    this.removeErrors('email')
  }

  password = () => {
    const password = this.validatable.password
    if (!password) {
      this.addError('password', 'password must be provided')
      return
    }
    if (password.length < 5) {
      this.addError('password', 'password must be at east 5 chars long')
      return
    }
    this.removeErrors('password')
  }

  passwordConfirmation = () => {
    const password = this.validatable.password
    const confirmation = this.validatable.passwordConfirmation
    if (password !== confirmation) {
      this.addError('passwordConfirmation', 'must match with password')
      return
    }
    this.removeErrors('passwordConfirmation')
  }
}

export interface IAuthenticationData {
  id?: string
  email?: string
  password?: string
  passwordConfirmation?: string
}

export class AuthenticationData extends BaseModel {
  @Property
  id?: string

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

export interface IPersonalData {
  id?: string
  firstName?: string
  lastName?: string
  address?: IAddress
  contactPhone?: string
  contactEmail?: string
}

export class PersonalData extends BaseModel implements IPersonalData {
  @Property
  id?: string

  @Property
  firstName?: string

  @Property
  lastName?: string

  @Property
  address?: Address

  @Property
  contactPhone?: string

  @Property
  contactEmail?: string
}

export interface IUser {
  id?: string
  authenticationData?: IAuthenticationData
  personalData?: IPersonalData
  roles?: UserRole[]
}

export class User extends BaseModel implements IUser {
  @Property
  id?: string

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
