import { Address } from '../address/model/Address'

export interface DeliveryAgent {
  firstName: string
  lastName: string
  legalAddress: Address
  contactData: {}
}
