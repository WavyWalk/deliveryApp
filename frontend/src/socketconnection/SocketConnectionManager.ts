import { io, Socket } from 'socket.io-client'
import { connectionState, SocketConnectionStatus } from './ConnectionState'

export enum SocketEvents {
  NEW_ORDER_WAS_ADDED = 'newOrderWasAdded',
  SENDER_ORDER_WAS_UPDATED = 'senderOrderWasUpdated'
}

export class SocketConnectionManager {
  socket?: Socket

  connect = (userId: string, roles?: string[]) => {
    connectionState.setConnectionStatus(SocketConnectionStatus.CONNECTING)
    this.socket = io('/', { query: { userId, role: roles?.[0] } })
      .on('connect', () => {
        connectionState.setConnectionStatus(SocketConnectionStatus.CONNECTED)
      })
      .on('connect_failed', () => {
        connectionState.setConnectionStatus(SocketConnectionStatus.ERROR)
      })
      .on('disconnect', () => {
        connectionState.setConnectionStatus(
          SocketConnectionStatus.NOT_CONNECTED
        )
      })
  }

  disconnect = () => {
    this.socket?.disconnect()
  }

  emit = (event: string, data: any) => {
    this?.socket?.emit(event, data)
  }

  on = (event: string, eventHandler: (data: any) => void) => {
    this.socket?.on(event, eventHandler)
  }

  off = (event: string, eventHandler: any) => {
    this.socket?.off(event, eventHandler)
  }
}

export const socketConnectionManager = new SocketConnectionManager()
