import { IUser, User } from '../../user/model/User'
import { IFulfillmentEvent } from './FulfillmentEvent'
import { prop } from '@typegoose/typegoose'

export enum FULFILLMENT_STATE {
  NEW_UNPROCESSED = 'NEW_UNPROCESSED',
  ACCEPTED_FOR_FULFILLMENT = 'ACCEPTED_FOR_FULFILLMENT',
  ON_WAY_TO_DESTINATION = 'ON_WAY_TO_DESTINATION',
  DELIVERED = 'DELIVERED',
  DELIVERY_ATTEMPT_FAILED = 'DELIVERY_ATTEMPT_FAILED',
}

export interface IShipmentOrderFulfillment {
  currentState?: string
  fulfillmentEvents: IFulfillmentEvent[]
  lastStateUpdatedAt?: number
  _id?: string
  deliveryAgent?: IUser
}

export class ShipmentOrderFulfillment {
  _id?: string

  @prop()
  currentState?: string

  @prop()
  lastStateUpdatedAt?: number

  @prop()
  fulfillmentEvents!: IFulfillmentEvent[]

  @prop({ type: () => User })
  deliveryAgent?: User

  save!: () => Promise<this>
}
