import { SubscriptionState } from '../lib/statemanagement'

export enum SocketConnectionStatus {
  NOT_CONNECTED = 'notConnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  ERROR = 'error'
}

class ConnectionState extends SubscriptionState {
  connectionStatus: SocketConnectionStatus =
    SocketConnectionStatus.NOT_CONNECTED

  setConnectionStatus = (value: SocketConnectionStatus) => {
    this.connectionStatus = value
    this.update()
  }
}

export const connectionState = new ConnectionState()
