import { SubscriptionState } from '../../lib/statemanagement'
import { accountClient } from '../clients/accountClient'
import { AuthenticationData, PersonalData, User } from '../model/IUser'

export class CreateAccountFormState extends SubscriptionState {
  user: User
  showPassword: boolean = false
  submitting: boolean = false

  constructor() {
    super()
    this.user = new User({
      authenticationData: new AuthenticationData(),
      personalData: new PersonalData()
    })
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
    this.user.authenticationData!.validator.validateCreateAccount()
    if (!this.user.validator.isValid()) {
      this.update()
      return
    }

    try {
      this.setSubmitting(true)
      await accountClient.createAccount(this.user)
      this.update()
    } finally {
      this.setSubmitting(false)
    }
  }
}

export const createAccountFormState = new CreateAccountFormState()
