import { getModelForClass, mongoose } from '@typegoose/typegoose'
import { IUser, User } from '../model/User'
import { Schema, ObjectId } from 'mongoose'

const userTable = getModelForClass(User)

export const userRepo_create = async (user: IUser) => {
  return userTable.create(user)
}

export const userRepo_findByAuthenticationData = async (authenticationDataId: string) => {
  return userTable.findOne({
    'authenticationData._id': authenticationDataId,
  })
}

export const userRepo_findById = async (userId: string) => {
  return userTable.findById(userId, { authenticationData: 0 })
}
