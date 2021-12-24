import { handleAsync } from '../../lib/handleAsync'
import { IShipmentOrder } from '../model/ShipmentOrder'
import {
  FULFILLMENT_STATE,
  IShipmentOrderFulfillment,
} from '../../orderfullfillment/model/ShipmentOrderFulfillment'
import { session_findCurrentUser } from '../../session/session'
import {
  shipmentOrderRepo_allOrdersForUser,
  shipmentOrderRepo_create,
  shipmentOrderRepo_findAcceptedByDeliverer,
  shipmentOrderRepo_findAllOpen,
  shipmentOrderRepo_findById,
  shipmentOrderRepo_findForDelivererWithCurrentState,
} from '../repository/shipmentOrderRepo'

const createBaseFulfillment = async () => {
  const fulfillmentData: IShipmentOrderFulfillment = {
    lastStateUpdatedAt: new Date().getTime(),
    fulfillmentEvents: [
      { fulfillmentState: FULFILLMENT_STATE.NEW_UNPROCESSED, timestamp: new Date().getTime() },
    ],
    currentState: FULFILLMENT_STATE.NEW_UNPROCESSED,
  }
  return fulfillmentData
}

export const shipmentOrderHandlers_create = handleAsync(async (req, res) => {
  const shipmentOrder: IShipmentOrder = req.body
  shipmentOrder.fulfillment = (await createBaseFulfillment())!
  shipmentOrder.customer = (await session_findCurrentUser(req))!
  const createdShipmentOrder = await shipmentOrderRepo_create(shipmentOrder)
  res.send(createdShipmentOrder.toObject())
})

export const shipmentOrderHandlers_getForCustomer = handleAsync(async (req, res) => {
  const currentUser = await session_findCurrentUser(req)
  const currentState = req.query.filterFulfillmentState as string | undefined
  console.log({ currentState })
  res.send(await shipmentOrderRepo_allOrdersForUser(currentUser!._id, { currentState }))
})

export const shipmentOrderHandlers_getById = handleAsync(async (req, res) => {
  const shipmentOrder = await shipmentOrderRepo_findById(req.params.id)
  if (!shipmentOrder) {
    return res.sendStatus(404)
  }
  res.send(shipmentOrder.toObject())
})

export const shipmentOrderHandlers_getForDeliverer = handleAsync(async (req, res) => {
  const filterState = req.query.filterFulfillmentState as string
  if (filterState === 'NO_FILTER') {
    return res.send(await shipmentOrderRepo_findAllOpen())
  }
  const deliverer = await session_findCurrentUser(req)
  if (filterState === 'ACCEPTED_BY_DELIVERER') {
    return res.send(await shipmentOrderRepo_findAcceptedByDeliverer(deliverer?._id))
  }
  return res.send(
    await shipmentOrderRepo_findForDelivererWithCurrentState(deliverer?._id!, filterState)
  )
})
