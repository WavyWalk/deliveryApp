import { Address, IAddress } from '../../address/model/Address'
import { BaseModel, HasOne, Property } from '../../lib/frontmodel'
import { IShipmentDetails, ShipmentDetails } from './ShipmentDetails'
import { Addressee, IAddressee } from '../../addressee/model/Addressee'
import { IUser, User } from '../../user/model/User'
import {
  IShipmentOrderFulfillment,
  ShipmentOrderFulfillment
} from '../../orderfullfillment/model/ShipmentOrderFulfillment'

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

export class ShipmentOrder extends BaseModel implements IShipmentOrder {
  @Property
  _id?: string

  @Property
  orderNumber?: string

  @Property
  userId?: string

  @HasOne(() => Addressee)
  sender?: Addressee

  @HasOne(() => Addressee)
  receiver?: Addressee

  @HasOne(() => Address)
  destinationAddress?: Address

  @HasOne(() => Address)
  originAddress?: Address

  @HasOne(() => ShipmentDetails)
  shipmentDetails?: ShipmentDetails

  @HasOne(() => User)
  customer?: User

  @HasOne(() => ShipmentOrderFulfillment)
  fulfillment?: ShipmentOrderFulfillment
}
