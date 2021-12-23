import { BaseModel, Property } from '../../../lib/frontmodel'
import { Address, IAddress } from '../../../address/model/Address'
import { PersonalDataValidator } from './PersonalDataValidator'

export interface IPersonalData {
  _id?: string
  firstName?: string
  lastName?: string
  address?: IAddress
  contactPhone?: string
  contactEmail?: string
}

export class PersonalData extends BaseModel implements IPersonalData {
  @Property
  _id?: string

  @Property
  firstName?: string

  @Property
  lastName?: string

  @Property
  address?: Address

  @Property
  contactPhone?: string

  @Property
  contactEmail?: string

  get validator() {
    return (this._validator ??= new PersonalDataValidator(this))
  }
}
