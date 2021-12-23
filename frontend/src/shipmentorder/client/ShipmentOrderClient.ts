import { ShipmentOrder } from '../model/ShipmentOrder'
import axios from 'axios'

class ShipmentOrderClient {
  createShipmentOrder = async (shipmentOrder: ShipmentOrder) => {
    const payload = shipmentOrder.serialize()
    const response = await axios.post('/api/shipmentOrders', payload)
    return new ShipmentOrder(response.data)
  }

  getShipmentOrder = async (shipmentOrderId: string) => {
    const response = await axios.get(`/api/shipmentOrders/${shipmentOrderId}`)
    return new ShipmentOrder(response.data)
  }

  getShipmentOrdersForCustomer = async ({
    filterFulfillmentState
  }: {
    filterFulfillmentState?: string
  }) => {
    const query = `?filterFulfillmentState=${filterFulfillmentState}`

    const response = await axios.get<ShipmentOrder[]>(
      `/api/shipmentOrders/customer${query}`
    )
    return response.data.map((it) => new ShipmentOrder(it))
  }

  getShipmentOrdersForDeliverer = async ({
    filterFulfillmentState
  }: {
    filterFulfillmentState?: string
  }) => {
    const query = `?filterFulfillmentState=${filterFulfillmentState}`
    const response = await axios.get<ShipmentOrder[]>(
      `/api/shipmentOrders/deliverer${query}`
    )
    return response.data.map((it) => new ShipmentOrder(it))
  }
}

export const shipmentOrderClient = new ShipmentOrderClient()
