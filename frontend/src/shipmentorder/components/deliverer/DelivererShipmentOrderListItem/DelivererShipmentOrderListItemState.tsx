import { SubscriptionState } from '../../../../lib/statemanagement'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { orderFulfillmentClient } from '../../../client/OrderFulfillmentClient'
import { NavigateFunction } from 'react-router-dom'

export class DelivererShipmentOrderListItemState extends SubscriptionState {
  isLoading = false

  constructor(public shipmentOrderFulfillment: ShipmentOrderFulfillment) {
    super()
  }

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  acceptOrder = async (navigate: NavigateFunction, shipmentOrderId: string) => {
    try {
      this.setIsLoading(true)
      console.log(this.shipmentOrderFulfillment)
      const updatedShipmentOrder =
        await orderFulfillmentClient.acceptForDeliverer(
          this.shipmentOrderFulfillment._id!
        )
      this.shipmentOrderFulfillment.modelData =
        updatedShipmentOrder.fulfillment!.modelData
      navigate(`/deliverer/shipments/${shipmentOrderId}`)
      this.update()
    } finally {
      this.setIsLoading(false)
    }
  }
}
