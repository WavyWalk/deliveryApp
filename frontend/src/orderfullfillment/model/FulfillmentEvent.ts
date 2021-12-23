import { BaseModel, Property } from '../../lib/frontmodel'
import { FULFILLMENT_STATE } from './ShipmentOrderFulfillment'

export interface IFulfillmentEvent {
  fulfillmentState?: FULFILLMENT_STATE[]
  humanReadable?: string
  timestamp?: string
}

export class FulfillmentEvent extends BaseModel implements IFulfillmentEvent {
  @Property
  fulfillmentState?: FULFILLMENT_STATE[]

  @Property
  humanReadable?: string

  @Property
  timestamp?: string
}
