import { handleAsync } from '../../lib/handleAsync'
import {
  shipmentOrderRepo_findByFulfillmentId,
  shipmentOrderRepo_save,
} from '../../shipmentorder/repository/shipmentOrderRepo'
import { session_findCurrentUser } from '../../session/session'
import { RequestInvalidError } from '../../middleware/errors/RequestInvalidError'
import { FULFILLMENT_STATE, ShipmentOrderFulfillment } from '../model/ShipmentOrderFulfillment'

export const shipmentOrderFulfillmentRequestHandlers_acceptForDelivery = handleAsync(
  async (req, res) => {
    const fulfillmentId = req.params.orderFulfillmentId
    const [shipmentOrder, deliveryAgent] = await Promise.all([
      shipmentOrderRepo_findByFulfillmentId(fulfillmentId),
      session_findCurrentUser(req),
    ])
    const fulfillment = shipmentOrder?.fulfillment
    if (!shipmentOrder || !deliveryAgent || !fulfillment) {
      throw new RequestInvalidError()
    }
    const timeStamp = new Date().getTime()
    ;(fulfillment.fulfillmentEvents ??= []).push({
      fulfillmentState: FULFILLMENT_STATE.ACCEPTED_FOR_FULFILLMENT,
      timestamp: timeStamp,
    })
    Object.assign(shipmentOrder.fulfillment!, {
      deliveryAgent: deliveryAgent,
      currentState: FULFILLMENT_STATE.ACCEPTED_FOR_FULFILLMENT,
      lastStateUpdatedAt: timeStamp,
    })
    const updated = await shipmentOrderRepo_save(shipmentOrder)
    return res.send(updated)
  }
)

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
