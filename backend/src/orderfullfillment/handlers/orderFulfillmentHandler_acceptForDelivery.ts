import { FULFILLMENT_STATE, ShipmentOrderFulfillment } from '../model/ShipmentOrderFulfillment'
import { ShipmentOrder } from '../../shipmentorder/model/ShipmentOrder'
import { User } from '../../user/model/User'
import { RequestInvalidError } from '../../errorhandling/errors/RequestInvalidError'
import { Request } from 'express'
import {
  shipmentOrderRepo_findByFulfillmentId,
  shipmentOrderRepo_save,
} from '../../shipmentorder/repository/shipmentOrderRepo'
import { session_findCurrentUser } from '../../session/session'
import { handleAsync } from '../../lib/handleAsync'
import { app } from '../../App'
import { socketRooms } from '../../sockets/SocketRooms'
import { SocketEvents } from '../../sockets/socketEvents'

const ensureDeliveryIsVacant = (fulfillment: ShipmentOrderFulfillment, deliveryAgent: User) => {
  if (!fulfillment.deliveryAgent?._id) {
    return
  }

  if (`${fulfillment.deliveryAgent?._id}` !== `${deliveryAgent?._id}`) {
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

export const orderFulfillmentHandler_acceptForDelivery = handleAsync(async (req, res) => {
  const { shipmentOrder, fulfillment, deliveryAgent } = await fetchAndValidateData(req)
  ensureDeliveryIsVacant(fulfillment, deliveryAgent)
  updatePropertiesForAcceptForDelivery(fulfillment, shipmentOrder, deliveryAgent)
  const updated = await shipmentOrderRepo_save(shipmentOrder)
  app.socketServer
    .to(socketRooms.getSenderWithId(updated.customer?._id!))
    .emit(SocketEvents.SENDER_ORDER_WAS_UPDATED, (updated as any).toObject())
  return res.send(updated)
})
