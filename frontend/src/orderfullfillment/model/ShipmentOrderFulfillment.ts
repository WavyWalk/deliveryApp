import { DeliveryAgent } from '../../actor/DeliveryAgent'

export enum FulfillmentState {
  NEW_UNPROCESSED = 'NEW_UNPROCESSED',
  ACCEPTED_FOR_FULFILLMENT = 'ACCEPTED_FOR_FULFILLMENT',
  AWAITS_AGENT = 'AWAITS_AGENT',
  AGENT_ASSIGNED = 'AGENT_ASSIGNED',
  WAITS_TO_BE_PICKED_UP = 'WAITS_TO_BE_PICKED_UP',
  AGENT_ON_WAY_TO_PICKUP = 'AGENT_ON_WAY_TO_PICKUP',
  PICKED_UP = 'PICKED_UP',
  ON_WAY_TO_DESTINATION = 'ON_WAY_TO_DESTINATION',
  DELIVERED = 'DELIVERED',
  DELIVERY_ATTEMPT_FAILED = 'DELIVERY_ATTEMPT_FAILED'
}

export interface FulfillmentEvent {
  fulfillmentState: FulfillmentState[]
  humanReadable: string
  timestamp: string
}

export interface ShipmentOrderFulfillment {
  currentState: FulfillmentState[]
  fulfillmentEvents: FulfillmentEvent[]
  agent: DeliveryAgent
}
