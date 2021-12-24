import express, { Router } from 'express'
import { PROJECT_DIR } from './index'
import { shipmentOrderRouter_build } from './shipmentorder/shipmentOrderRouter'
import { orderFulfillmentRouter_build } from './orderfullfillment/orderFulfillmentRouter'
import { sessionsRouter_build } from './session/sessionsRouter'
import { usersRouter_build } from './user/usersRouter'

const apiRouter = () => {
  const apiRouter = Router({ mergeParams: true })
  apiRouter.use('/users', usersRouter_build())
  apiRouter.use('/sessions', sessionsRouter_build())
  apiRouter.use('/shipmentOrders', shipmentOrderRouter_build())
  apiRouter.use('/orderFulfillment', orderFulfillmentRouter_build())
  apiRouter.use('/*', (req, res) => {
    res.sendStatus(404)
  })
  return apiRouter
}

export const router_setRoutes = (app: express.Application) => {
  app.use('/', express.static(`./public`))
  app.use('/api', apiRouter())
  app.get('*', (req, res) => {
    res.sendFile(`${PROJECT_DIR}/public/index.html`)
  })
}
