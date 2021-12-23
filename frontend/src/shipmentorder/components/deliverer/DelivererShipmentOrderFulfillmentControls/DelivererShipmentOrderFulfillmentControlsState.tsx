import { SubscriptionState } from '../../../../lib/statemanagement'
import {
  FULFILLMENT_STATE,
  ShipmentOrderFulfillment
} from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { orderFulfillmentClient } from '../../../client/OrderFulfillmentClient'

export class DelivererShipmentOrderFulfillmentControlsState extends SubscriptionState {
  isLoadingForStep?: FULFILLMENT_STATE

  fulfillmentSelection = [
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
      await orderFulfillmentClient.updateFulfillmentState(
        this.fulfillment._id!,
        fulfillmentState
      )
    } finally {
      this.setIsLoadingForStep()
    }
  }
}
