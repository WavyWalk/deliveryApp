import {Prop} from "@typegoose/typegoose";

export interface IAddress {
  country?: string
  locality?: string
  postalCode?: string
  streetNumber?: string
  street?: string
}
