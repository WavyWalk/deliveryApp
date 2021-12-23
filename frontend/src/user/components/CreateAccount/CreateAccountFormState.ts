import { SubscriptionState } from '../../../lib/statemanagement'
import { userClient } from '../../clients/userClient'
import { User } from '../../model/User'
import { NavigateFunction } from 'react-router-dom'
import { sessionState } from '../../SessionState'
import { UserRole } from '../../model/UserRole'
import { AuthenticationData } from '../../model/authenticationdata/AuthenticationData'
import { PersonalData } from '../../model/personaldata/PersonalData'

export class CreateAccountFormState extends SubscriptionState {
  user: User
  showPassword: boolean = false
  submitting: boolean = false

  constructor() {
    super()
    this.user = new User({
      roles: [UserRole.SENDER],
      authenticationData: new AuthenticationData()
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

  initializeRegisterAsDeliverer = () => {
    this.user.roles = [UserRole.DELIVERY_AGENT]
    this.user.personalData = new PersonalData()
    this.update()
  }

  get isDelivererMode() {
    return this.user.roles?.find((it) => it === UserRole.DELIVERY_AGENT)
  }

  submit = async (navigate: NavigateFunction) => {
    this.user.authenticationData!.validator.validateCreateAccount()
    this.user.personalData?.validator?.validateAccountCreate()
    if (!this.user.validator.isValid()) {
      console.log('invalid', this.user)
      this.update()
      return
    }

    try {
      this.setSubmitting(true)
      await userClient.createAccount(this.user)
      await sessionState.fetchCurrentUser()
      sessionState.navigateToUsersHomePage(navigate)
      this.update()
    } finally {
      this.setSubmitting(false)
    }
  }
}

export const createAccountFormState = new CreateAccountFormState()
