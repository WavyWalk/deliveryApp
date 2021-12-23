import { getModelForClass } from '@typegoose/typegoose'
import { IShipmentOrder, ShipmentOrder } from '../model/ShipmentOrder'
import {
  FULFILLMENT_STATE,
  ShipmentOrderFulfillment,
} from '../../orderfullfillment/model/ShipmentOrderFulfillment'
import { ObjectId } from 'mongodb'

const shipmentOrderTable = getModelForClass(ShipmentOrder)

export const shipmentOrderRepo_create = async (shipmentOrder: IShipmentOrder) => {
  return shipmentOrderTable.create(shipmentOrder)
}

export const shipmentOrderRepo_allOrdersForUser = async (
  userId: ObjectId,
  filters: Partial<ShipmentOrderFulfillment>
) => {
  return shipmentOrderTable.find({
    'customer._id': userId,
    ...(filters.currentState !== 'NO_FILTER' && {
      'fulfillment.currentState': filters.currentState,
    }),
  })
}

export const shipmentOrderRepo_findById = (id: string) => {
  return shipmentOrderTable.findById(id)
}

export const shipmentOrderRepo_findByFulfillmentId = (id: string) => {
  return shipmentOrderTable.findOne({ 'fulfillment._id': new ObjectId(id) })
}

export const shipmentOrderRepo_findAllOpen = () => {
  return shipmentOrderTable.find({ 'fulfillment.currentState': FULFILLMENT_STATE.NEW_UNPROCESSED })
}

export const shipmentOrderRepo_findForDelivererWithCurrentState = (
  delivererId: ObjectId,
  currentState: string
) => {
  return shipmentOrderTable.find(
    {
      'fulfillment.currentState': FULFILLMENT_STATE.NEW_UNPROCESSED,
      'fulfillment.deliveryAgent._id': delivererId,
      currentState,
    },
    { lean: true }
  )
}

export const shipmentOrderRepo_save = async (shipmentOrder: ShipmentOrder) => {
  return await shipmentOrder.save()
}
