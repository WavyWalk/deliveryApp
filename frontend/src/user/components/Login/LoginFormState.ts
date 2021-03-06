import { SubscriptionState } from '../../../lib/statemanagement'
import { sessionClient } from '../../clients/SessionClient'
import { NavigateFunction } from 'react-router-dom'
import { sessionState } from '../../SessionState'
import { AuthenticationData } from '../../model/authenticationdata/AuthenticationData'

export class LoginFormState extends SubscriptionState {
  authenticationData: AuthenticationData
  showPassword: boolean = false
  submitting: boolean = false

  get hasLoginError() {
    return this.authenticationData.errors?.general
  }

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

  clearGeneralError = () => {
    this.authenticationData.validator.removeErrors(
      'general' as keyof AuthenticationData
    )
    this.update()
  }

  submit = async (navigateFunc: NavigateFunction) => {
    this.authenticationData.validator.validateLogin()
    if (!this.authenticationData.validator.isValid()) {
      this.update()
      return
    }

    try {
      this.setSubmitting(true)
      const responseUser = await sessionClient.login(this.authenticationData)
      if (!responseUser.validator.isValid()) {
        this.authenticationData.replaceErrorsFrom(responseUser)
        return
      }
      await sessionState.fetchCurrentUser()
      sessionState.navigateToUsersHomePage(navigateFunc)
    } finally {
      this.setSubmitting(false)
    }
    this.update()
  }
}
