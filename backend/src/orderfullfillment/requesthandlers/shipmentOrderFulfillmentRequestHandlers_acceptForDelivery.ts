import { FULFILLMENT_STATE, ShipmentOrderFulfillment } from '../model/ShipmentOrderFulfillment'
import { ShipmentOrder } from '../../shipmentorder/model/ShipmentOrder'
import { User } from '../../user/model/User'
import { RequestInvalidError } from '../../middleware/errors/RequestInvalidError'
import { Request } from 'express'
import {
  shipmentOrderRepo_findByFulfillmentId,
  shipmentOrderRepo_save,
} from '../../shipmentorder/repository/shipmentOrderRepo'
import { session_findCurrentUser } from '../../session/session'
import { handleAsync } from '../../lib/handleAsync'

const ensureDeliveryIsVacant = (fulfillment: ShipmentOrderFulfillment, deliveryAgent: User) => {
  if (!fulfillment.deliveryAgent?._id) {
    return
  }

  if (fulfillment.deliveryAgent?._id !== deliveryAgent?._id) {
    throw new RequestInvalidError()
  }
}

const fetchAndValidateData = async (req: Request) => {
  const fulfillmentId = req.params.orderFulfillmentId

  const [shipmentOrder, deliveryAgent] = await Promise.all([
    shipmentOrderRepo_findByFulfillmentId(fulfillmentId),
    session_findCurrentUser(req),
  ])

  const fulfillment = shipmentOrder?.fulfillment
  if (!shipmentOrder || !deliveryAgent || !fulfillment) {
    throw new RequestInvalidError()
  }

  return { shipmentOrder, fulfillment, deliveryAgent }
}

const updatePropertiesForAcceptForDelivery = (
  fulfillment: ShipmentOrderFulfillment,
  shipmentOrder: ShipmentOrder,
  deliveryAgent: User
) => {
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
}

export const shipmentOrderFulfillmentRequestHandlers_acceptForDelivery = handleAsync(
  async (req, res) => {
    const { shipmentOrder, fulfillment, deliveryAgent } = await fetchAndValidateData(req)

    ensureDeliveryIsVacant(fulfillment, deliveryAgent)

    updatePropertiesForAcceptForDelivery(fulfillment, shipmentOrder, deliveryAgent)

    const updated = await shipmentOrderRepo_save(shipmentOrder)

    return res.send(updated)
  }
)
