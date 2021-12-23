import { FULFILLMENT_STATE } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'

export const delivererOrderListFulfillmentFilterSelection = [
  {
    text: 'All open orders',
    value: 'NO_FILTER'
  },
  {
    text: 'All my accepted orders',
    value: 'ACCEPTED_BY_DELIVERER'
  },
  {
    text: 'My on way to destination',
    value: FULFILLMENT_STATE.ON_WAY_TO_DESTINATION
  },
  {
    text: 'My delivered orders',
    value: FULFILLMENT_STATE.DELIVERED
  }
]
