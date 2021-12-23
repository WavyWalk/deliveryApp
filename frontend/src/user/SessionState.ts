import { User } from './model/User'
import { sessionClient } from './clients/SessionClient'
import { SubscriptionState } from '../lib/statemanagement'
import { UserRole } from './model/UserRole'
import { NavigateFunction } from 'react-router-dom'

export class SessionState extends SubscriptionState {
  userFetched = false
  currentUser?: User
  isLoading = false

  constructor() {
    super()
    void this.fetchCurrentUser()
  }

  isCurrentUserSender = () => {
    return this.currentUser?.roles?.find((it) => it === UserRole.SENDER)
  }

  isCurrentUserDeliveryAgent = () => {
    return this.currentUser?.roles?.find((it) => it === UserRole.DELIVERY_AGENT)
  }

  isCurrentUserGuest = () => {
    return this.currentUser?.roles?.find((it) => it === UserRole.GUEST)
  }

  setLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  fetchCurrentUser = async () => {
    try {
      this.setLoading(true)
      this.currentUser = await sessionClient.getLoggedInUserDetails()
      this.userFetched = true
      this.update()
    } finally {
      this.setLoading(false)
    }
  }

  navigateToUsersHomePage(navigateFunc: NavigateFunction) {
    if (this.isCurrentUserGuest()) {
      return navigateFunc('/signUp')
    }
    if (this.isCurrentUserDeliveryAgent()) {
      return navigateFunc('/deliverer')
    }
    navigateFunc('/sender')
  }
}

export const sessionState = new SessionState()
