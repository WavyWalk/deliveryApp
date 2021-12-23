import { Router } from 'express'
import {
  sessionRequestHandlers_getCurrentUser,
  sessionRequestHandlers_login,
  sessionRequestHandlers_logout,
} from './requesthandlers/sessionRequestHandlers'

export const sessionsRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.post('/', sessionRequestHandlers_login)
  router.get('/', sessionRequestHandlers_getCurrentUser)
  router.delete('/', sessionRequestHandlers_logout)
  return router
}
