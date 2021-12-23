import { Router } from 'express'
import {
  shipmentOrderFulfillmentRequestHandlers_acceptForDelivery,
  shipmentOrderFulfillmentRequestHandlers_updateState,
} from './requesthandlers/shipmentOrderFulfillmentRequestHandlers'

export const orderFulfillmentRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.put(
    '/:orderFulfillmentId/acceptForDelivery',
    shipmentOrderFulfillmentRequestHandlers_acceptForDelivery
  )
  router.put(
    '/:orderFulfillmentId/updateState',
    shipmentOrderFulfillmentRequestHandlers_updateState
  )
  router.put

  return router
}
