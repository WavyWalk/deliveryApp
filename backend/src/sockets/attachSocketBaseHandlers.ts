import { Server, Socket } from 'socket.io'
import { UserRole } from '../user/model/UserRole'
import { socketRooms } from './SocketRooms'

export const attachSocketBaseHandlers = (io: Server) => {
  io.on('connection', async (socket: Socket) => {
    const { userId, role } = socket.handshake.query as any

    if (role === UserRole.SENDER) {
      console.log('SOCKET CONNECTED: ', socketRooms.getSenderWithId(userId))
      socket.join(socketRooms.getSenderWithId(userId))
      return
    }

    if (role === UserRole.DELIVERY_AGENT) {
      console.log('SOCKET CONNECTED: ', socketRooms.getAllDeliverer())
      socket.join(socketRooms.getAllDeliverer())
      return
    }

    socket.disconnect()
  })
}
