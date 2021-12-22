import { User } from '../model/IUser'
import axios from 'axios'

export class AccountClient {
  createAccount = async (user: User) => {
    const payload = user.serialize()
    const response = await axios.post<User>('/api/accounts', payload)
    return new User(response.data)
  }
}

export const accountClient = new AccountClient()
