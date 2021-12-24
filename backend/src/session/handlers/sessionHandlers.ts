import { handleAsync } from '../../lib/handleAsync'
import { Request } from 'express'
import { RequestInvalidError } from '../../errorhandling/errors/RequestInvalidError'
import { authenticationDataRepo_findByEmail } from '../../authenticationdata/repository/authenticationDataRepo'
import { IAuthenticationData } from '../../authenticationdata/model/AuthenticationData'
import { userRepo_findByAuthenticationData } from '../../user/repository/userRepo'
import { session_createSession, session_logout, session_findCurrentUser } from '../session'
import { passwordHasher_compare } from '../../security/passwordHasher'

const getSanitizedLoginDataFromRequest = (req: Request) => {
  const authenticationData: IAuthenticationData = req.body
  if (!authenticationData?.email) {
    throw new RequestInvalidError()
  }
  return authenticationData
}

const guestResponse = { roles: ['GUEST'] }

export const sessionHandlers_login = handleAsync(async (req, res) => {
  const authenticationRequestData = getSanitizedLoginDataFromRequest(req)
  const authenticationData = await authenticationDataRepo_findByEmail(
    authenticationRequestData.email!
  )
  if (!authenticationData) {
    throw new RequestInvalidError()
  }
  if (
    !(await passwordHasher_compare(
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

export const sessionHandlers_getCurrentUser = handleAsync(async (req, res) => {
  const user = await session_findCurrentUser(req)
  if (!user) {
    return res.send(guestResponse)
  }
  return res.send(user)
})

export const sessionHandlers_logout = handleAsync(async (req, res) => {
  session_logout(res)
  res.send(guestResponse)
})
