import { SubscriptionState } from '../../../../lib/statemanagement'
import { ShipmentOrder } from '../../../model/ShipmentOrder'
import { SessionState } from '../../../../user/SessionState'
import { shipmentOrderClient } from '../../../client/ShipmentOrderClient'

export class DelivererShipmentOrderListState extends SubscriptionState {
  isLoading = false

  shipmentOrders: ShipmentOrder[] = []

  noOpenOrders = false

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  constructor(private sessionState: SessionState) {
    super()
    void this.fetchShipmentOrders()
  }

  fetchShipmentOrders = async () => {
    try {
      this.setIsLoading(true)
      const orders = await shipmentOrderClient.getShipmentOrdersForCustomer(
        this.sessionState.currentUser?._id!
      )
      this.noOpenOrders = !orders.length
      this.shipmentOrders = orders
    } finally {
      this.setIsLoading(false)
    }
  }
}
