import { User } from './model/IUser'
import { sessionClient } from './clients/SessionClient'
import { SubscriptionState } from '../lib/statemanagement'
import { UserRole } from './model/UserRole'

class SessionState extends SubscriptionState {
  currentUser?: User
  loading: boolean = false

  isCurrentUserSender = () => {
    return (this.currentUser?.roles?.find((it) => it === UserRole.SENDER))
  }

  isCurrentUserDeliveryAgent = () => {
    return (this.currentUser?.roles?.find((it) => it === UserRole.DELIVERY_AGENT))
  }

  isCurrentUserGuest = () => {
    return (this.currentUser?.roles?.find((it) => it === UserRole.GUEST))
  }

  setLoading = (value: boolean) => {
    this.loading = value
    this.update()
  }

  fetchCurrentUser = async () => {
    try {
      this.setLoading(true)
      this.currentUser = await sessionClient.getLoggedInUserDetails()
      console.log('ok', this.currentUser)
    } finally {
      this.setLoading(false)
    }
  }
}

export const sessionState = new SessionState()
