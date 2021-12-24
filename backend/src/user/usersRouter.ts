import { Router } from 'express'
import { userHandlers_createUser } from './requesthandlers/userHandlers'

export const usersRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.post('/', userHandlers_createUser)
  return router
}
