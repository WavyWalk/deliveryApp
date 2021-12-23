import { SubscriptionState } from '../../../../lib/statemanagement'
import {
  FULFILLMENT_STATE,
  ShipmentOrderFulfillment
} from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { orderFulfillmentClient } from '../../../client/OrderFulfillmentClient'

export class DelivererShipmentOrderListItemState extends SubscriptionState {
  isLoading = false

  constructor(public shipmentOrderFulfillment: ShipmentOrderFulfillment) {
    super()
  }

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  acceptOrder = async () => {
    try {
      this.setIsLoading(true)
      await orderFulfillmentClient.updateFulfillmentState(
        this.shipmentOrderFulfillment._id!,
        FULFILLMENT_STATE.ACCEPTED_FOR_FULFILLMENT
      )
    } finally {
      this.setIsLoading(false)
    }
  }
}
