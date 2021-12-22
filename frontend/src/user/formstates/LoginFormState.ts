import { SubscriptionState } from '../../lib/statemanagement'
import { AuthenticationData } from '../model/IUser'
import { sessionClient } from '../clients/SessionClient'

export class LoginFormState extends SubscriptionState {
  authenticationData: AuthenticationData
  showPassword: boolean = false
  submitting: boolean = false

  constructor() {
    super()
    this.authenticationData = new AuthenticationData()
  }

  toggleShowPassword = () => {
    this.showPassword = !this.showPassword
    this.update()
  }

  setSubmitting = (value: boolean) => {
    this.submitting = value
    this.update()
  }

  submit = async () => {
    if (this.submitting) {
      return
    }

    this.authenticationData.validator.validateLogin()
    if (!this.authenticationData.validator.isValid()) {
      this.update()
      return
    }

    try {
      this.setSubmitting(true)
      await sessionClient.login(this.authenticationData)
    } finally {
      this.setSubmitting(false)
    }
    this.update()
  }
}

export const loginFormState = new LoginFormState()
