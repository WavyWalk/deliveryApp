import { Router } from 'express'
import {
  shipmentOrderHandlers_create,
  shipmentOrderHandlers_getById,
  shipmentOrderHandlers_getForCustomer,
  shipmentOrderHandlers_getForDeliverer,
} from './handlers/shipmentOrderHandlers'

export const shipmentOrderRouter_build = () => {
  const router = Router({ mergeParams: true })
  router.post('/', shipmentOrderHandlers_create)
  router.get('/customer', shipmentOrderHandlers_getForCustomer)
  router.get('/deliverer', shipmentOrderHandlers_getForDeliverer)
  router.get('/:id', shipmentOrderHandlers_getById)
  return router
}
