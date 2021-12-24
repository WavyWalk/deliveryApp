import { Router } from 'express'
import { orderFulfillmentHandler_updateState } from './handlers/orderFulfillmentHandler_updateState'
import { orderFulfillmentHandler_acceptForDelivery } from './handlers/orderFulfillmentHandler_acceptForDelivery'

export const orderFulfillmentRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.put('/:orderFulfillmentId/acceptForDelivery', orderFulfillmentHandler_acceptForDelivery)
  router.put('/:orderFulfillmentId/updateState', orderFulfillmentHandler_updateState)
  router.put

  return router
}
