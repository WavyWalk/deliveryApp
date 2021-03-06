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

  toggleRoleMode = () => {
    if (this.user.roles?.[0] === UserRole.SENDER) {
      this.user.roles = [UserRole.DELIVERY_AGENT]
      this.user.personalData = new PersonalData()
    } else {
      this.user.roles = [UserRole.SENDER]
      this.user.personalData = undefined
    }
    this.update()
  }

  get isDelivererMode() {
    return this.user.roles?.find((it) => it === UserRole.DELIVERY_AGENT)
  }

  submit = async (navigate: NavigateFunction) => {
    this.user.authenticationData!.validator.validateCreateAccount()
    this.user.personalData?.validator?.validateAccountCreate()
    if (!this.user.validator.isValid()) {
      this.update()
      return
    }

    try {
      this.setSubmitting(true)
      const responseUser = await userClient.createAccount(this.user)
      if (!responseUser.validator.isValid()) {
        this.user.replaceErrorsFrom(responseUser)
        this.update()
        return
      }

      await sessionState.fetchCurrentUser()
      sessionState.navigateToUsersHomePage(navigate)

      this.update()
    } finally {
      this.setSubmitting(false)
    }
  }
}
