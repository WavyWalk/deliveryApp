import { FULFILLMENT_STATE } from '../../orderfullfillment/model/ShipmentOrderFulfillment'
import axios from 'axios'
import { ShipmentOrder } from '../model/ShipmentOrder'

export class OrderFulfillmentClient {
  updateFulfillmentState = async (
    orderShipmentFulfillmentId: string,
    fulfillmentState: FULFILLMENT_STATE
  ) => {
    const payload = { fulfillmentState }
    const response = await axios.put<ShipmentOrder>(
      `/api/orderFulfillment/${orderShipmentFulfillmentId}/updateState`,
      payload
    )
    return new ShipmentOrder(response.data)
  }

  acceptForDeliverer = async (orderShipmentFulfillmentId: string) => {
    const response = await axios.put<ShipmentOrder>(
      `/api/orderFulfillment/${orderShipmentFulfillmentId}/acceptForDelivery`
    )
    return new ShipmentOrder(response.data)
  }
}

export const orderFulfillmentClient = new OrderFulfillmentClient()
