import { IAddress } from '../../address/model/Address'
import { IShipmentDetails } from './ShipmentDetails'
import { IAddressee } from '../../addressee/model/Addressee'
import { IUser, User } from '../../user/model/User'
import {
  IShipmentOrderFulfillment,
  ShipmentOrderFulfillment
} from '../../orderfullfillment/model/ShipmentOrderFulfillment'
import {prop} from "@typegoose/typegoose";

export interface IShipmentOrder {
  id?: string
  orderNumber?: string
  userId?: string
  sender?: IAddressee
  receiver?: IAddressee
  destinationAddress?: IAddress
  originAddress?: IAddress
  shipmentDetails?: IShipmentDetails
  user?: IUser
  fulfillment?: IShipmentOrderFulfillment
}

export class ShipmentOrder {
  @prop()
  orderNumber?: string

  @prop()
  userId?: string

  @prop()
  sender?: IAddressee

  @prop()
  receiver?: IAddressee

  @prop()
  destinationAddress?: IAddress

  @prop()
  originAddress?: IAddress

  @prop()
  shipmentDetails?: IShipmentDetails

  @prop({type: () => User})
  customer?: User

  @prop({type: () => ShipmentOrderFulfillment})
  fulfillment?: ShipmentOrderFulfillment

}
