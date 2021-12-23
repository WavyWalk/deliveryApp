import { FULFILLMENT_STATE } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'

export const fulfillmentFilterSelection = [
  {
    text: 'all',
    value: 'NO_FILTER'
  },
  {
    text: 'waits for deliverer',
    value: FULFILLMENT_STATE.NEW_UNPROCESSED
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
