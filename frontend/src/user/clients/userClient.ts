import { User } from '../model/User'
import axios from 'axios'

export class UserClient {
  createAccount = async (user: User) => {
    const payload = user.serialize()
    const response = await axios.post<User>('/api/users', payload)
    return new User(response.data)
  }
}

export const userClient = new UserClient()
