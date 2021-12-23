import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { IUser } from '../user/model/User'
import { userRepo_findById } from '../user/repository/userRepo'

const getSecret = () => {
  return 'SECRETFROMENV'
}

export const session_createSession = async (res: Response, user: IUser, roles: string[]) => {
  const userData = {
    _id: user._id!,
    roles: roles,
  }
  const token = jwt.sign(userData, getSecret(), { expiresIn: '200 days' })
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 3600000 * 24 * 200),
  })
}

export const session_findCurrentUser = async (req: Request) => {
  const userData = await session_getCurrentUserDataFromToken(req)
  if (!userData) {
    return
  }
  return await userRepo_findById(userData._id!)
}

export const session_getCurrentUserDataFromToken = async (req: Request): Promise<IUser | null> => {
  const token = req.cookies?.token
  if (!token) {
    return null
  }
  try {
    return await new Promise<any>((resolve, reject) => {
      if (!token) {
        reject()
        return
      }
      jwt.verify(token, getSecret(), (err: any, decoded: any) => {
        if (err) {
          reject()
          return
        }
        resolve(decoded)
      })
    })
  } catch (e) {
    return null
  }
}

export const session_logout = (res: Response) => {
  res.cookie('token', null, {
    expires: new Date(0),
  })
}
