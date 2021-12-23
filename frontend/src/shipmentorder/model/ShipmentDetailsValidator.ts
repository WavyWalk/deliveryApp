import { ModelValidator } from '../../lib/frontmodel'
import { validators_validateNotEmpty } from '../../modelvalidation/validators'
import { ShipmentDetails } from './ShipmentDetails'

export class ShipmentDetailsValidator extends ModelValidator<
  ShipmentDetails,
  any
> {
  parcelType = () => {
    validators_validateNotEmpty(this, 'parcelType')
  }

  validateShipmentCreate = () => {
    this.parcelType()
    return this.isValid()
  }
}
