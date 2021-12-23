import { BaseModel, HasMany, HasOne, Property } from '../../lib/frontmodel'
import { IUser, User } from '../../user/model/User'
import { FulfillmentEvent, IFulfillmentEvent } from './FulfillmentEvent'

export enum FULFILLMENT_STATE {
  NEW_UNPROCESSED = 'NEW_UNPROCESSED',
  ACCEPTED_FOR_FULFILLMENT = 'ACCEPTED_FOR_FULFILLMENT',
  ON_WAY_TO_DESTINATION = 'ON_WAY_TO_DESTINATION',
  DELIVERED = 'DELIVERED',
  DELIVERY_ATTEMPT_FAILED = 'DELIVERY_ATTEMPT_FAILED'
}

export interface IShipmentOrderFulfillment {
  currentState?: `${FULFILLMENT_STATE}`
  fulfillmentEvents: IFulfillmentEvent[]
  lastStateUpdatedAt?: string
  deliveryAgent?: IUser
  _id?: string
}

export class ShipmentOrderFulfillment
  extends BaseModel
  implements IShipmentOrderFulfillment
{
  @Property
  _id?: string

  @Property
  currentState?: FULFILLMENT_STATE

  @Property
  lastStateUpdatedAt?: string

  @HasOne(() => User)
  deliveryAgent?: User

  @HasMany(() => FulfillmentEvent)
  fulfillmentEvents!: FulfillmentEvent[]
}
