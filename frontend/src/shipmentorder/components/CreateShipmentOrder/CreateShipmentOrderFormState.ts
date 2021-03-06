import { SubscriptionState } from '../../../lib/statemanagement'
import { IShipmentOrder, ShipmentOrder } from '../../model/ShipmentOrder'
import { Address } from '../../../address/model/Address'
import { IShipmentDetails, ShipmentDetails } from '../../model/ShipmentDetails'
import { Addressee } from '../../../addressee/model/Addressee'
import { NavigateFunction } from 'react-router-dom'
import { shipmentOrderClient } from '../../client/ShipmentOrderClient'

export enum CREATE_SHIPMENT_STEP {
  SENDER = 'sender',
  ORIGIN_ADDRESS = 'originAddress',
  RECEIVER = 'receiver',
  DESTINATION_ADDRESS = 'destinationAddress',
  SHIPMENT_DETAILS = 'shipmentDetails'
}

const steps = [
  { name: CREATE_SHIPMENT_STEP.SENDER, text: 'Sender info' },
  { name: CREATE_SHIPMENT_STEP.ORIGIN_ADDRESS, text: 'Pick up at' },
  { name: CREATE_SHIPMENT_STEP.RECEIVER, text: 'receiver info' },
  {
    name: CREATE_SHIPMENT_STEP.DESTINATION_ADDRESS,
    text: 'Deliver to address'
  },
  { name: CREATE_SHIPMENT_STEP.SHIPMENT_DETAILS, text: 'finalize' }
]

export class CreateShipmentOrderFormState extends SubscriptionState {
  shipmentOrder: ShipmentOrder

  currentStep: CREATE_SHIPMENT_STEP = CREATE_SHIPMENT_STEP.SENDER

  steps = steps

  verificationDialogIsOpen = false

  isLoading = false

  constructor() {
    super()
    const defaultShipmentDetailsData: IShipmentDetails = {
      parcelType: 'parcel2Kg',
      safeHandlingLabel: 'regular'
    }
    const initialData: IShipmentOrder = {
      destinationAddress: new Address(),
      originAddress: new Address(),
      sender: new Addressee(),
      receiver: new Addressee(),
      shipmentDetails: new ShipmentDetails(defaultShipmentDetailsData)
    }
    this.shipmentOrder = new ShipmentOrder(initialData)
  }

  setVerificationDialogIsOpen = (value: boolean) => {
    this.verificationDialogIsOpen = value
    this.update()
  }

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  completedSteps = () => {
    return {
      [CREATE_SHIPMENT_STEP.SENDER]: this.shipmentOrder.sender?.validator
        .makeCopy()
        .validateForShipmentCreate(),
      [CREATE_SHIPMENT_STEP.ORIGIN_ADDRESS]:
        this.shipmentOrder.originAddress?.validator
          .makeCopy()
          .validateShipmentCreate(),
      [CREATE_SHIPMENT_STEP.RECEIVER]: this.shipmentOrder.receiver?.validator
        .makeCopy()
        .validateForShipmentCreate(),
      [CREATE_SHIPMENT_STEP.DESTINATION_ADDRESS]:
        this.shipmentOrder.destinationAddress?.validator
          .makeCopy()
          .validateShipmentCreate(),
      [CREATE_SHIPMENT_STEP.SHIPMENT_DETAILS]:
        this.shipmentOrder.shipmentDetails?.validator
          .makeCopy()
          .validateShipmentCreate()
    }
  }

  getCurrentStepIndex = () => {
    return this.steps.findIndex((it) => it.name === this.currentStep)
  }

  goNextStep = () => {
    const currentIndex = this.getCurrentStepIndex()
    if (currentIndex >= this.steps.length - 1) {
      return
    }
    const nextStep = this.steps[currentIndex + 1]
    this.currentStep = nextStep.name
    this.update()
  }

  goPreviousStep = () => {
    const currentIndex = this.getCurrentStepIndex()
    if (currentIndex === 0) {
      return
    }
    const nextStep = this.steps[currentIndex - 1]
    this.currentStep = nextStep.name
    this.update()
  }

  submit = async (navigate: NavigateFunction) => {
    try {
      this.setIsLoading(true)
      const createdShipmentOrder =
        await shipmentOrderClient.createShipmentOrder(this.shipmentOrder)
      navigate(`/sender/shipments/${createdShipmentOrder._id}`)
    } finally {
      this.setIsLoading(false)
    }
  }

  allStepsCompleted = () => {
    return !Object.values(this.completedSteps()).filter((it) => it !== true)
      .length
  }

  navigateToStep = (targetStep: CREATE_SHIPMENT_STEP) => {
    if (!this.completedSteps()[targetStep]) {
      return
    }
    if (
      targetStep === CREATE_SHIPMENT_STEP.SHIPMENT_DETAILS &&
      !this.allStepsCompleted()
    ) {
      return
    }
    this.currentStep = targetStep
    this.update()
  }
}

export const createShipmentOrderFormState = new CreateShipmentOrderFormState()
