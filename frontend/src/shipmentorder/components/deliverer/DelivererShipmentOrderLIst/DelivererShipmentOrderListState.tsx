import { SubscriptionState } from '../../../../lib/statemanagement'
import { ShipmentOrder } from '../../../model/ShipmentOrder'
import { shipmentOrderClient } from '../../../client/ShipmentOrderClient'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'

export class DelivererShipmentOrderListState extends SubscriptionState {
  isLoading = false

  shipmentOrders: ShipmentOrder[] = []
  noOrders: boolean = true

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
        await shipmentOrderClient.getShipmentOrdersForDeliverer({
          filterFulfillmentState: this.fulfillmentStateFilter.currentState
        })
      this.noOrders = shipmentOrders.length > 0
      this.shipmentOrders = shipmentOrders
      this.update()
    } finally {
      this.setIsLoading(false)
    }
  }
}
