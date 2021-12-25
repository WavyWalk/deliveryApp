import { UserRole } from '../user/model/UserRole'

class SocketRooms {
  getAllDeliverer = () => {
    return 'ALL_DELIVERER'
  }
  getSenderWithId = (userId: string) => {
    return `${userId}${UserRole.SENDER}`
  }
}

export const socketRooms = new SocketRooms()
