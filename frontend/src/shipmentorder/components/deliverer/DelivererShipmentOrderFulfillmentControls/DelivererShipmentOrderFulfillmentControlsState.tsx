import { SubscriptionState } from '../../../../lib/statemanagement'
import {
  FULFILLMENT_STATE,
  ShipmentOrderFulfillment
} from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { orderFulfillmentClient } from '../../../client/OrderFulfillmentClient'
import { NavigateFunction } from 'react-router-dom'

export class DelivererShipmentOrderFulfillmentControlsState extends SubscriptionState {
  isLoadingForStep?: FULFILLMENT_STATE

  fulfillmentSelection = [
    {
      text: 'In progress',
      value: FULFILLMENT_STATE.ACCEPTED_FOR_FULFILLMENT
    },
    {
      text: 'On way to destination',
      value: FULFILLMENT_STATE.ON_WAY_TO_DESTINATION
    },
    {
      text: 'delivered',
      value: FULFILLMENT_STATE.DELIVERED
    },
    {
      text: 'delivery attempt failed',
      value: FULFILLMENT_STATE.DELIVERY_ATTEMPT_FAILED
    }
  ]

  constructor(public fulfillment: ShipmentOrderFulfillment) {
    super()
  }

  setIsLoadingForStep = (value?: FULFILLMENT_STATE) => {
    this.isLoadingForStep = value
    this.update()
  }

  updateFulfillmentState = async (fulfillmentState: FULFILLMENT_STATE) => {
    try {
      this.setIsLoadingForStep(fulfillmentState)
      const updatedShipmentOrder =
        await orderFulfillmentClient.updateFulfillmentState(
          this.fulfillment._id!,
          fulfillmentState
        )
      this.fulfillment.modelData = updatedShipmentOrder.fulfillment!.modelData
    } finally {
      this.setIsLoadingForStep()
    }
  }

  acceptForDelivery = async (navigateFunc: NavigateFunction) => {
    try {
      this.setIsLoadingForStep(FULFILLMENT_STATE.NEW_UNPROCESSED)
      const responseShipmentOrder =
        await orderFulfillmentClient.acceptForDeliverer(this.fulfillment._id!)
      navigateFunc(`/deliverer/shipmentOrders/${responseShipmentOrder._id}`)
    } finally {
      this.setIsLoadingForStep()
    }
  }
}
