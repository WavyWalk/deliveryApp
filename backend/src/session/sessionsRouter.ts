import { Router } from 'express'
import {
  sessionHandlers_getCurrentUser,
  sessionHandlers_login,
  sessionHandlers_logout,
} from './handlers/sessionHandlers'

export const sessionsRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.post('/', sessionHandlers_login)
  router.get('/', sessionHandlers_getCurrentUser)
  router.delete('/', sessionHandlers_logout)
  return router
}
