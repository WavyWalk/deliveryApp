import { FULFILLMENT_STATE } from '../../orderfullfillment/model/ShipmentOrderFulfillment'
import { mocks_makeShipmentOrderCreateResult } from '../../devutils/mocks'

export class OrderFulfillmentClient {
  updateFulfillmentState = async (
    orderShipmentFulfillmentId: string,
    fulfillmentState: FULFILLMENT_STATE
  ) => {
    const payload = { fulfillmentState }
    return mocks_makeShipmentOrderCreateResult()
  }
}

export const orderFulfillmentClient = new OrderFulfillmentClient()
