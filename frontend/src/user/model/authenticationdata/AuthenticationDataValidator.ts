import { ModelValidator } from '../../../lib/frontmodel'
import { AuthenticationData } from './AuthenticationData'
import {
  validators_validateEmail,
  validators_validateNotEmpty
} from '../../../modelvalidation/validators'

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
    validators_validateNotEmpty(this, 'email')
    if (this.validatable.email) {
      validators_validateEmail(this, 'email')
    }
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
