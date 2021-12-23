import { ModelValidator } from '../../../lib/frontmodel'
import { PersonalData } from './PersonalData'
import {
  validators_validateNotEmpty,
  validators_validatePhone
} from '../../../modelvalidation/validators'

export class PersonalDataValidator extends ModelValidator<PersonalData, any> {
  firstName = () => {
    validators_validateNotEmpty(this, 'firstName')
  }

  lastName = () => {
    validators_validateNotEmpty(this, 'lastName')
  }

  contactPhone = () => {
    validators_validatePhone(this, 'contactPhone')
  }

  validateAccountCreate = () => {
    this.firstName()
    this.lastName()
    this.contactPhone()
  }
}
