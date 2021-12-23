import { User } from '../model/User'
import axios from 'axios'
import { AuthenticationData } from '../model/authenticationdata/AuthenticationData'

export class SessionClient {
  login = async (authenticationData: AuthenticationData) => {
    const payload = authenticationData.serialize()
    const response = await axios.post<User>('/api/sessions', payload)
    return new User(response.data)
  }

  getLoggedInUserDetails = async () => {
    const response = await axios.get<User>('/api/sessions')
    return new User(response.data)
  }

  logout = async () => {
    const response = await axios.delete<User>('/api/sessions')
    return new User(response.data)
  }
}

export const sessionClient = new SessionClient()
