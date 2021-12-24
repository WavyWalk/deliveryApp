import { handleAsync } from '../../lib/handleAsync'
import {
  shipmentOrderRepo_findByFulfillmentId,
  shipmentOrderRepo_save,
} from '../../shipmentorder/repository/shipmentOrderRepo'
import { RequestInvalidError } from '../../errorhandling/errors/RequestInvalidError'
import { ShipmentOrderFulfillment } from '../model/ShipmentOrderFulfillment'
import { Request } from 'express'
import { ShipmentOrder } from '../../shipmentorder/model/ShipmentOrder'

async function prepareData(req: Request) {
  const updatedStatus: string = req.body.fulfillmentState
  const fulfillmentId: string = req.params.orderFulfillmentId

  const shipmentOrder = await shipmentOrderRepo_findByFulfillmentId(fulfillmentId)

  const fulfillment = shipmentOrder?.fulfillment

  if (!shipmentOrder || !fulfillment) {
    throw new RequestInvalidError()
  }
  return { updatedStatus, shipmentOrder, fulfillment }
}

function assignFulfillmentEvents(fulfillment: ShipmentOrderFulfillment) {
  ;(fulfillment.fulfillmentEvents ??= []).push({
    fulfillmentState: fulfillment.currentState,
    timestamp: fulfillment.lastStateUpdatedAt,
  })
}

function updateFulfillmentProperties(updatedStatus: string, shipmentOrder: ShipmentOrder) {
  const updateData: Partial<ShipmentOrderFulfillment> = {
    currentState: updatedStatus,
    lastStateUpdatedAt: new Date().getTime(),
  }

  Object.assign(shipmentOrder.fulfillment!, updateData)
}

export const orderFulfillmentHandler_updateState = handleAsync(async (req, res) => {
  const { updatedStatus, shipmentOrder, fulfillment } = await prepareData(req)
  assignFulfillmentEvents(fulfillment)
  updateFulfillmentProperties(updatedStatus, shipmentOrder)
  const updatedShipmentOrder = await shipmentOrderRepo_save(shipmentOrder)
  res.send(updatedShipmentOrder)
})
