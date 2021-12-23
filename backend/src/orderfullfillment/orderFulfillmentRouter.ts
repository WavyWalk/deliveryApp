import { Router } from 'express'
import { shipmentOrderFulfillmentRequestHandlers_updateState } from './requesthandlers/shipmentOrderFulfillmentRequestHandlers_updateState'
import { shipmentOrderFulfillmentRequestHandlers_acceptForDelivery } from './requesthandlers/shipmentOrderFulfillmentRequestHandlers_acceptForDelivery'

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
