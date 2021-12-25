import { SubscriptionState } from '../../../../lib/statemanagement'
import { ShipmentOrder } from '../../../model/ShipmentOrder'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { shipmentOrderClient } from '../../../client/ShipmentOrderClient'
import {
  socketConnectionManager,
  SocketEvents
} from '../../../../socketconnection/SocketConnectionManager'
import { useEffect } from 'react'
import { globalInfoToastsState } from '../../../../infotoasts/globalInfoToastsState'

export class SenderShipmentOrderListState extends SubscriptionState {
  isLoading = false

  shipmentOrders: ShipmentOrder[] = []
  userHasOrders: boolean = true

  fulfillmentStateFilter = new ShipmentOrderFulfillment({
    currentState: 'NO_FILTER'
  })

  constructor() {
    super()
    void this.fetchShipmentOrders()
    this.listenSocketOnStatusUpdated()
  }

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  listenSocketOnStatusUpdated = () => {
    socketConnectionManager.on(
      SocketEvents.SENDER_ORDER_WAS_UPDATED,
      (shipmentOrderData: ShipmentOrder) => {
        const updatedShipmentOrder = new ShipmentOrder(shipmentOrderData)
        globalInfoToastsState.pushInfo(
          `status of order #${updatedShipmentOrder._id} changed to ${shipmentOrderData.fulfillment?.currentState}`
        )
        const orderInList = this.shipmentOrders?.find(
          (it) => it._id === updatedShipmentOrder._id
        )
        if (orderInList) {
          orderInList.modelData = updatedShipmentOrder.modelData
          console.log(orderInList)
        }
        this.update()
      }
    )
  }

  useCleanup = () => {
    useEffect(() => {
      return () =>
        socketConnectionManager.off(SocketEvents.SENDER_ORDER_WAS_UPDATED)
    }, [])
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
