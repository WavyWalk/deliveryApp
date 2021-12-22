import { AuthenticationData, User } from '../model/IUser'
import axios from 'axios'
import { mockPromise } from '../../devutils/mockPromise'
import { mocks_makeUserSender } from '../../devutils/mocks'

export class SessionClient {
  login = async (authenticationData: AuthenticationData) => {
    const payload = authenticationData.serialize()
    const response = await axios.post<User>('/api/sessions', payload)
    return new User(response.data)
  }

  getLoggedInUserDetails = async () => {
    // const response = await axios.get<User>('/api/sessions/currentUser')
    // return response.data
    return mockPromise(mocks_makeUserSender())
  }
}

export const sessionClient = new SessionClient()
