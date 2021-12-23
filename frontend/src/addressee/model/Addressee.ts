import { BaseModel, ModelValidator, Property } from '../../lib/frontmodel'
import {
  validators_validateEmail,
  validators_validateNotEmpty,
  validators_validatePhone
} from '../../modelvalidation/validators'

export interface IAddressee {
  id?: string
  firstName?: string
  lastName?: string
  contactPhone?: string
  contactEmail?: string
}

export class AddresseeValidator extends ModelValidator<Addressee, any> {
  firstName = () => {
    validators_validateNotEmpty(this, 'firstName')
  }

  lastName = () => {
    validators_validateNotEmpty(this, 'lastName')
  }

  contactPhone = () => {
    validators_validateNotEmpty(this, 'contactPhone')
    if (this.validatable.contactPhone) {
      validators_validatePhone(this, 'contactPhone')
    }
  }

  contactEmail = () => {
    if (this.validatable.contactEmail) {
      validators_validateEmail(this, 'contactEmail')
    } else {
      this.removeErrors('contactEmail')
    }
  }

  validateForShipmentCreate = () => {
    this.firstName()
    this.lastName()
    this.contactPhone()
    return this.isValid()
  }
}

export class Addressee extends BaseModel implements IAddressee {
  @Property
  id?: string

  @Property
  firstName?: string

  @Property
  lastName?: string

  @Property
  contactPhone?: string

  @Property
  contactEmail?: string

  get validator() {
    return (this._validator ??= new AddresseeValidator(this))
  }
}
