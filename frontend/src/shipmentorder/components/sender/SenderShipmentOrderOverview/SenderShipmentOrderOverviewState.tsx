import { ShipmentOrder } from '../../../model/ShipmentOrder'
import { SubscriptionState } from '../../../../lib/statemanagement'
import { shipmentOrderClient } from '../../../client/ShipmentOrderClient'

export class SenderShipmentOrderOverviewState extends SubscriptionState {
  shipmentOrder?: ShipmentOrder

  isLoading = false

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  fetchShipmentOrder = async (shipmentOrderId: string) => {
    try {
      this.shipmentOrder = await shipmentOrderClient.getShipmentOrder(
        shipmentOrderId
      )
      this.update()
    } finally {
      this.setIsLoading(false)
    }
  }
}
