import { SubscriptionState } from '../../../../lib/statemanagement'
import { ShipmentOrder } from '../../../model/ShipmentOrder'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { shipmentOrderClient } from '../../../client/ShipmentOrderClient'

export class SenderShipmentOrderListState extends SubscriptionState {
  isLoading = false

  shipmentOrders: ShipmentOrder[] = []
  userHasOrders: boolean = true

  fulfillmentStateFilter = new ShipmentOrderFulfillment({
    currentState: 'NO_FILTER'
  })

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  constructor() {
    super()
    void this.fetchShipmentOrders()
  }

  fetchShipmentOrders = async () => {
    try {
      this.setIsLoading(true)
      const shipmentOrders =
        await shipmentOrderClient.getShipmentOrdersForCustomer({
          filterFulfillmentState: this.fulfillmentStateFilter.currentState
        })
      this.userHasOrders = shipmentOrders.length > 0
      this.shipmentOrders = shipmentOrders
      this.update()
    } finally {
      this.setIsLoading(false)
    }
  }
}
