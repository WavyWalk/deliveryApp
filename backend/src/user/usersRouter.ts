import { Router } from 'express'
import { userRequestHandlers_createUser } from './requesthandlers/userRequestHandlers'

export const usersRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.post('/', userRequestHandlers_createUser)
  return router
}
