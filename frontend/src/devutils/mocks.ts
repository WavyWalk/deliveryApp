import { IUser, User } from '../user/model/User'
import { UserRole } from '../user/model/UserRole'
import {
  IShipmentOrder,
  ShipmentOrder
} from '../shipmentorder/model/ShipmentOrder'
import { FULFILLMENT_STATE } from '../orderfullfillment/model/ShipmentOrderFulfillment'

export const mocks_makeUserSender = (): User => {
  const userData: IUser = {
    _id: 'foo',
    authenticationData: {
      _id: 'naz'
    },
    personalData: {
      _id: 'bar',
      contactEmail: 'joe@doe.com',
      contactPhone: '123123',
      firstName: 'fo',
      lastName: 'bar'
    },
    roles: [UserRole.GUEST]
  }
  return new User(userData)
}

export const mocks_makeShipmentOrderCreateResult = (): ShipmentOrder => {
  const data: IShipmentOrder = {
    destinationAddress: {
      country: 'Germany',
      postalCode: '40628',
      locality: 'asdasd',
      street: 'asd',
      streetNumber: '123124'
    },
    originAddress: {
      country: 'Germany',
      postalCode: '40628',
      locality: 'Asdasd',
      street: 'asdasd',
      streetNumber: 'asdasd 12'
    },
    sender: {
      firstName: 'Joe',
      lastName: 'Doe',
      contactEmail: 'asd@asd.com',
      contactPhone: '1231241241'
    },
    receiver: {
      firstName: 'asd',
      lastName: 'asd',
      contactEmail: 'asd@asd.com',
      contactPhone: '123124'
    },
    shipmentDetails: {
      parcelType: 'parcel2Kg',
      safeHandlingLabel: 'regular',
      noteToDeliveryAgent: 'Hello please handle with care'
    },
    fulfillment: {
      fulfillmentEvents: [],
      currentState: FULFILLMENT_STATE.ON_WAY_TO_DESTINATION,
      deliveryAgent: {
        personalData: {
          contactPhone: '123'
        }
      }
    }
  }
  return new ShipmentOrder(data)
}
