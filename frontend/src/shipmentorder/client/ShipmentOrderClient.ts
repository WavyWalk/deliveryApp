import { ShipmentOrder } from '../model/ShipmentOrder'
import axios from 'axios'
import { mocks_makeShipmentOrderCreateResult } from '../../devutils/mocks'

class ShipmentOrderClient {
  createShipmentOrder = async (shipmentOrder: ShipmentOrder) => {
    const payload = shipmentOrder.serialize()
    const response = await axios.post('/api/shipmentOrders', payload)
    return new ShipmentOrder(response.data)
  }

  getShipmentOrder = async (shipmentOrderId: string) => {
    return mocks_makeShipmentOrderCreateResult()
    const response = await axios.get(`/api/shipmentOrders/${shipmentOrderId}`)
    return new ShipmentOrder(response.data)
  }

  getShipmentOrdersForCustomer = async (customerId: string) => {
    return Array(10).fill(mocks_makeShipmentOrderCreateResult())
  }
}

export const shipmentOrderClient = new ShipmentOrderClient()
