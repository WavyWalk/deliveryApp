import express, { Router } from 'express'
import path from 'path'
import { PROJECT_DIR } from './index'
import { userRequestHandlers_createUser } from './user/requesthandlers/userRequestHandlers'
import {
  sessionRequestHandlers_getCurrentUser,
  sessionRequestHandlers_login,
} from './session/requesthandlers/sessionRequestHandlers'

const usersRouter = () => {
  const router = Router({ mergeParams: true })
  router.post('/', userRequestHandlers_createUser)
  return router
}

const sessionsRouter = () => {
  const router = Router({ mergeParams: true })
  router.post('/', sessionRequestHandlers_login)
  router.get('/', sessionRequestHandlers_getCurrentUser)
  return router
}

const apiRouter = () => {
  const apiRouter = Router({ mergeParams: true })
  apiRouter.use('/users', usersRouter())
  apiRouter.use('/sessions', sessionsRouter())
  apiRouter.use('/*', (req, res) => {
    res.sendStatus(404)
  })
  return apiRouter
}

export const router_setRoutes = (app: express.Application) => {
  app.use('/', express.static(`./public/dist`))
  app.use('/api', apiRouter())
  app.get('*', (req, res) => {
    res.sendFile(`${PROJECT_DIR}/public/dist/index.html`)
  })
}
