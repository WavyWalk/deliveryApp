import { handleAsync } from '../../lib/handleAsync'
import { Request } from 'express'
import { RequestInvalidError } from '../../middleware/errors/RequestInvalidError'
import {
  authenticationDataRepo_create,
  authenticationDataRepo_findByEmail,
} from '../../authenticationdata/repository/authenticationDataRepo'
import { IAuthenticationData } from '../../authenticationdata/model/AuthenticationData'
import { passwordHasher } from '../../security/passwordHasher'
import { userRequestHandlers_createUser } from '../../user/requesthandlers/userRequestHandlers'
import {
  userRepo_findByAuthenticationData,
  userRepo_findById,
} from '../../user/repository/userRepo'
import {
  session_getCurrentUserDataFromToken,
  session_createSession,
  session_logout,
} from '../session'

const getSanitizedLoginDataFromRequest = (req: Request) => {
  const authenticationData: IAuthenticationData = req.body
  if (!authenticationData?.email) {
    throw new RequestInvalidError()
  }
  return authenticationData
}

export const sessionRequestHandlers_login = handleAsync(async (req, res) => {
  const authenticationRequestData = getSanitizedLoginDataFromRequest(req)
  const authenticationData = await authenticationDataRepo_findByEmail(
    authenticationRequestData.email!
  )
  if (!authenticationData) {
    throw new RequestInvalidError()
  }
  if (
    !(await passwordHasher.compare(
      authenticationRequestData.password!,
      authenticationData.password!
    ))
  ) {
    return res.send({ errors: { general: ['invalid credentials'] } })
  }
  const fetchedUser = await userRepo_findByAuthenticationData(authenticationData._id)

  if (!fetchedUser) {
    return res.send({ errors: { general: ['invalid credentials'] } })
  }

  await session_createSession(res, fetchedUser, fetchedUser.roles!)
  res.send(fetchedUser.toObject())
})

const guestResponse = { roles: ['GUEST'] }

export const sessionRequestHandlers_getCurrentUser = handleAsync(async (req, res) => {
  const userData = await session_getCurrentUserDataFromToken(req)
  console.log({ userData })
  if (!userData) {
    return res.send(guestResponse)
  }
  console.log({ userData })
  const user = await userRepo_findById(userData._id!)
  if (!user) {
    session_logout(res)
    return res.send(guestResponse)
  }
  return res.send(user)
})