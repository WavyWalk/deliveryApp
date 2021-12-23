import {
  FULFILLMENT_STATE,
  ShipmentOrderFulfillment
} from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { SubscriptionState } from '../../../../lib/statemanagement'

export const senderSteps = [
  {
    key: FULFILLMENT_STATE.NEW_UNPROCESSED,
    name: 'Parcel waits for deliverer acceptance'
  },
  {
    key: FULFILLMENT_STATE.ACCEPTED_FOR_FULFILLMENT,
    name: 'Deliverer is on the way to pickup location'
  },
  {
    key: FULFILLMENT_STATE.ON_WAY_TO_DESTINATION,
    name: 'Deliverer picked up and on the way to destination'
  },
  {
    key: FULFILLMENT_STATE.DELIVERED,
    name: 'Parcel delivered'
  }
]

export class FulfillmentInformationState extends SubscriptionState {
  shipmentOrderFulfillment: ShipmentOrderFulfillment

  steps = senderSteps

  constructor(shipmentOrderFulfillment: ShipmentOrderFulfillment) {
    super()
    this.shipmentOrderFulfillment = shipmentOrderFulfillment
  }

  get isOnDelivererStep() {
    return (
      this.steps[this.currentStepIndex]?.key ===
      FULFILLMENT_STATE.ACCEPTED_FOR_FULFILLMENT
    )
  }

  get currentStepIndex() {
    const state = this.shipmentOrderFulfillment.currentState
    return senderSteps.findIndex((it) => it.key === state)
  }

  getTimestampForStep = (step: FULFILLMENT_STATE) => {
    const timeStamp = this.shipmentOrderFulfillment.fulfillmentEvents.find(
      (it) => it.fulfillmentState === step
    )?.timestamp
    if (!timeStamp) {
      return
    }
    return new Date(timeStamp).toISOString()
  }
}
