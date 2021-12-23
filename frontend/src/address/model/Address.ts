import { BaseModel, ModelValidator, Property } from '../../lib/frontmodel'
import {
  validators_validateNotEmpty,
  validators_validatePostalCode
} from '../../modelvalidation/validators'

export interface IAddress {
  country?: string
  locality?: string
  postalCode?: string
  streetNumber?: string
  street?: string
}

export class AddressValidator extends ModelValidator<Address, any> {
  country = () => {
    validators_validateNotEmpty(this, 'country')
  }

  locality = () => {
    validators_validateNotEmpty(this, 'locality')
  }

  postalCode = () => {
    validators_validateNotEmpty(this, 'postalCode')
    if (this.validatable.postalCode) {
      validators_validatePostalCode(this, 'postalCode')
    }
  }

  streetNumber = () => {
    validators_validateNotEmpty(this, 'streetNumber')
  }

  street = () => {
    validators_validateNotEmpty(this, 'street')
  }

  validateShipmentCreate = () => {
    this.country()
    this.locality()
    this.postalCode()
    this.streetNumber()
    this.street()
    return this.isValid()
  }
}

export class Address extends BaseModel implements IAddress {
  @Property
  country?: string

  @Property
  locality?: string

  @Property
  postalCode?: string

  @Property
  streetNumber?: string

  @Property
  street?: string

  get validator() {
    return (this._validator ??= new AddressValidator(this))
  }
}
