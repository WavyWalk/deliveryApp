import { IUser, User } from '../user/model/IUser'
import { UserRole } from '../user/model/UserRole'

export const mocks_makeUserSender = (): User => {
  const userData: IUser = {
    id: 'foo',
    authenticationData: {
      id: 'naz'
    },
    personalData: {
      id: 'bar',
      contactEmail: 'joe@doe.com',
      contactPhone: '123123',
      firstName: 'fo',
      lastName: 'bar'
    },
    roles: [UserRole.GUEST]
  }
  return new User(userData)
}
