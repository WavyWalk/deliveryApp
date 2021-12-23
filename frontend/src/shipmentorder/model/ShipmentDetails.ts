import { BaseModel, Property } from '../../lib/frontmodel'
import { ShipmentDetailsValidator } from './ShipmentDetailsValidator'

export const availableParcels = {
  parcel2Kg: 'parcel 2 kg',
  parcel5kg: 'parcel 5 kg',
  parcel10kg: 'parcel 10kg',
  parcel31: 'parcel 31,5 kg'
}

export const handlingLabels = {
  fragile: 'Fragile',
  regular: 'Regular'
}

export interface IShipmentDetails {
  parcelType?: string
  safeHandlingLabel?: string
  noteToDeliveryAgent?: string
}

export class ShipmentDetails extends BaseModel implements IShipmentDetails {
  @Property
  parcelType?: string

  @Property
  safeHandlingLabel?: string

  @Property
  noteToDeliveryAgent?: string

  get validator() {
    return (this._validator ??= new ShipmentDetailsValidator(this))
  }
}
