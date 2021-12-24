import { handleAsync } from '../../lib/handleAsync'
import { IUser } from '../model/User'
import {
  authenticationDataRepo_create,
  authenticationDataRepo_findByEmail,
} from '../../authenticationdata/repository/authenticationDataRepo'
import { passwordHasher_hash } from '../../security/passwordHasher'
import { userRepo_create, userRepo_findByAuthenticationData } from '../repository/userRepo'
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

const userWithEmailExists = async (email: string) => {
  const existingUser = await authenticationDataRepo_findByEmail(email)
  return !!existingUser
}

export const userHandlers_createUser = handleAsync(async (req, res) => {
  const { userData, authenticationData } = sanitizeCreateRequest(req)
  if (await userWithEmailExists(authenticationData.email!)) {
    return res.send({ authenticationData: { errors: { email: ['such user exists'] } } })
  }
  userData.authenticationData = await prepareAndCreateAuthenticationData(authenticationData)
  const persistedUser = await userRepo_create(userData)
  await session_createSession(res, persistedUser, userData.roles!)
  const responseData: IUser = persistedUser.toObject()
  delete responseData.authenticationData
  res.send(responseData)
})
