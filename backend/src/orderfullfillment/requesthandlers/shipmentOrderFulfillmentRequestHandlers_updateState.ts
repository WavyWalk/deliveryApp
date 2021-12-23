import { handleAsync } from '../../lib/handleAsync'
import {
  shipmentOrderRepo_findByFulfillmentId,
  shipmentOrderRepo_save,
} from '../../shipmentorder/repository/shipmentOrderRepo'
import { RequestInvalidError } from '../../middleware/errors/RequestInvalidError'
import { ShipmentOrderFulfillment } from '../model/ShipmentOrderFulfillment'

export const shipmentOrderFulfillmentRequestHandlers_updateState = handleAsync(async (req, res) => {
  const updatedStatus = req.body.fulfillmentState
  const fulfillmentId = req.params.orderFulfillmentId

  const shipmentOrder = await shipmentOrderRepo_findByFulfillmentId(fulfillmentId)

  const fulfillment = shipmentOrder?.fulfillment

  if (!shipmentOrder || !fulfillment) {
    throw new RequestInvalidError()
  }

  ;(fulfillment.fulfillmentEvents ??= []).push({
    fulfillmentState: fulfillment.currentState,
    timestamp: fulfillment.lastStateUpdatedAt,
  })

  const updateData: Partial<ShipmentOrderFulfillment> = {
    currentState: updatedStatus,
    lastStateUpdatedAt: new Date().getTime(),
  }

  Object.assign(shipmentOrder.fulfillment!, updateData)

  const updatedShipmentOrder = await shipmentOrderRepo_save(shipmentOrder)

  res.send(updatedShipmentOrder)
})
