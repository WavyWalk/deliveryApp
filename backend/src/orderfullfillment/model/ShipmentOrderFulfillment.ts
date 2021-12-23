import { IUser, User } from '../../user/model/User'
import { IFulfillmentEvent } from './FulfillmentEvent'
import {prop} from "@typegoose/typegoose";

export interface IShipmentOrderFulfillment {
  currentState?: string
  fulfillmentEvents: IFulfillmentEvent[]
  lastStateUpdatedAt?: string
  _id?: string
  deliveryAgent?: IUser
}

export class ShipmentOrderFulfillment
{
  @prop()
  currentState?: string

  @prop()
  lastStateUpdatedAt?: string

  @prop()
  fulfillmentEvents!: IFulfillmentEvent[]

  @prop({type: () => User})
  deliveryAgent?: User
}
