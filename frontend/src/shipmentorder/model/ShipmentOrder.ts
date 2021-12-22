import { Addressee, IAddressee } from '../../actor/Sender'
import { Address, IAddress } from '../../address/model/Address'
import { BaseModel, HasOne, Property } from '../../lib/frontmodel'
import { IShipmentDetails, ShipmentDetails } from './ShipmentDetails'

export interface IShipmentOrder {
  userId?: string
  sender?: IAddressee
  receiver?: IAddressee
  destinationAddress?: IAddress
  originAddress?: IAddress
  shipmentDetails?: IShipmentDetails
  noteToDeliverer?: string
}

export class ShipmentOrder extends BaseModel implements IShipmentOrder {
  @Property
  userId?: string

  @Property
  sender?: Addressee

  @Property
  receiver?: Addressee

  @Property
  noteToDeliverer?: string

  @HasOne(() => Address)
  destinationAddress?: Address

  @HasOne(() => Address)
  originAddress?: Address

  @HasOne(() => ShipmentDetails)
  shipmentDetails?: ShipmentDetails
}
