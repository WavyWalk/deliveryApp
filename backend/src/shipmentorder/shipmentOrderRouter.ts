import { Router } from 'express'
import {
  shipmentOrderRequestHandlers_create,
  shipmentOrderRequestHandlers_getById,
  shipmentOrderRequestHandlers_getForCustomer,
  shipmentOrderRequestHandlers_getForDeliverer,
} from './requesthandlers/shipmentOrderRequestHandlers'

export const shipmentOrderRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.post('/', shipmentOrderRequestHandlers_create)
  router.get('/customer', shipmentOrderRequestHandlers_getForCustomer)
  router.get('/deliverer', shipmentOrderRequestHandlers_getForDeliverer)
  router.get('/:id', shipmentOrderRequestHandlers_getById)
  return router
}
