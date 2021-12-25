import { ShipmentOrder } from '../../../model/ShipmentOrder'
import { SubscriptionState } from '../../../../lib/statemanagement'
import { shipmentOrderClient } from '../../../client/ShipmentOrderClient'
import {
  socketConnectionManager,
  SocketEvents
} from '../../../../socketconnection/SocketConnectionManager'
import { globalInfoToastsState } from '../../../../infotoasts/globalInfoToastsState'
import { useEffect } from 'react'

export class SenderShipmentOrderOverviewState extends SubscriptionState {
  shipmentOrder?: ShipmentOrder

  isLoading = false

  constructor() {
    super()
    this.listenSocketOnStatusUpdated()
  }

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

  listenSocketOnStatusUpdated = () => {
    socketConnectionManager.on(
      SocketEvents.SENDER_ORDER_WAS_UPDATED,
      (shipmentOrderData: ShipmentOrder) => {
        const updatedShipmentOrder = new ShipmentOrder(shipmentOrderData)
        globalInfoToastsState.pushInfo(
          `status of this order was just changed to ${shipmentOrderData.fulfillment?.currentState}`
        )
        this.shipmentOrder = updatedShipmentOrder
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
}
