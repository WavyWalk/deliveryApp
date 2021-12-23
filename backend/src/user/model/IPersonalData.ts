import {IAddress} from "../../address/model/Address";

export interface IPersonalData {
  id?: string
  firstName?: string
  lastName?: string
  address?: IAddress
  contactPhone?: string
  contactEmail?: string
}
