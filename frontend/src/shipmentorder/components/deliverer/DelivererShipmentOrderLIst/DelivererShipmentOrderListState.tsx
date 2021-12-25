import { SubscriptionState } from '../../../../lib/statemanagement'
import { ShipmentOrder } from '../../../model/ShipmentOrder'
import { shipmentOrderClient } from '../../../client/ShipmentOrderClient'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import {
  socketConnectionManager,
  SocketEvents
} from '../../../../socketconnection/SocketConnectionManager'
import { useEffect } from 'react'
import { globalInfoToastsState } from '../../../../infotoasts/globalInfoToastsState'

export class DelivererShipmentOrderListState extends SubscriptionState {
  isLoading = false

  shipmentOrders: ShipmentOrder[] = []
  noOrders: boolean = true

  fulfillmentStateFilter = new ShipmentOrderFulfillment({
    currentState: 'NO_FILTER'
  })

  lastAddedFromSocket?: ShipmentOrder

  lastAddedFromSocketModelOpened = false

  constructor() {
    super()
    void this.fetchShipmentOrders()
    socketConnectionManager.on(
      SocketEvents.NEW_ORDER_WAS_ADDED,
      this.onSocketShipmentOrderAddedEvent
    )
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

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  setLastAddedFromSocket = (shipmentOrder: ShipmentOrder) => {
    this.lastAddedFromSocket = shipmentOrder
    this.setLastAddedFromSocketModelOpened(true)
  }

  setLastAddedFromSocketModelOpened = (value: boolean) => {
    this.lastAddedFromSocketModelOpened = value
    this.update()
  }

  onSocketShipmentOrderAddedEvent = (shipmentOrder: ShipmentOrder) => {
    globalInfoToastsState.pushInfo('New order was placed')
    this.setLastAddedFromSocket(shipmentOrder)
    this.update()
  }

  useCleanup = () => {
    useEffect(() => {
      return () => {
        socketConnectionManager.off(
          SocketEvents.NEW_ORDER_WAS_ADDED,
          this.onSocketShipmentOrderAddedEvent
        )
      }
    }, [])
  }
}
