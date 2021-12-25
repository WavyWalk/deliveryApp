import { SubscriptionState } from '../lib/statemanagement'

class GlobalInfoToastsState extends SubscriptionState {
  infoToast?: { message: string; severity: string; duration: number }

  pushInfo = (message: string) => {
    this.infoToast = { message, severity: 'info', duration: 2500 }
    this.update()
  }

  close = () => {
    this.infoToast = undefined
    this.update()
  }
}

export const globalInfoToastsState = new GlobalInfoToastsState()
