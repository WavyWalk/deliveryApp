import { handleAsync } from '../../lib/handleAsync'
import { IUser } from '../model/User'
import { authenticationDataRepo_create } from '../../authenticationdata/repository/authenticationDataRepo'
import { passwordHasher_hash } from '../../security/passwordHasher'
import { userRepo_create } from '../repository/userRepo'
import { Request } from 'express'
import { session_createSession } from '../../session/session'
import { IAuthenticationData } from '../../authenticationdata/model/AuthenticationData'

const sanitizeCreateRequest = (request: Request) => {
  const rawData: IUser = request.body
  const userData = rawData
  const { authenticationData } = rawData
  if (!userData || !authenticationData) {
    throw new Error()
  }
  return { userData, authenticationData }
}

const prepareAndCreateAuthenticationData = async (authenticationData: IAuthenticationData) => {
  authenticationData.password = await passwordHasher_hash(authenticationData.password!)
  return await authenticationDataRepo_create(authenticationData)
}

export const userHandlers_createUser = handleAsync(async (request, response) => {
  const { userData, authenticationData } = sanitizeCreateRequest(request)
  userData.authenticationData = await prepareAndCreateAuthenticationData(authenticationData)
  const persistedUser = await userRepo_create(userData)
  await session_createSession(response, persistedUser, userData.roles!)
  const responseData: IUser = persistedUser.toObject()
  delete responseData.authenticationData
  response.send(responseData)
})
