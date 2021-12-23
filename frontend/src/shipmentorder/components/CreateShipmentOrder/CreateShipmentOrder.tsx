import React, { FC } from 'react'
import {
  CREATE_SHIPMENT_STEP,
  CreateShipmentOrderFormState,
  createShipmentOrderFormState
} from './CreateShipmentOrderFormState'
import {
  Box,
  Card,
  CardContent,
  Step,
  StepButton,
  Stepper
} from '@mui/material'
import { CreateShipmentOrderAddresseeStep } from './steps/CreateShipmentOrderAddresseeStep'
import { CreateShipmentOrderAddressStep } from './steps/CreateShipmentOrderAddressStep'
import { CreateShipmentOrderShipmentDetailsStep } from './steps/CreateShipmentOrderShipmentDetailsStep'
import { ShipmentOrderConfirmationDialog } from './ShipmentOrderConfirmationDialog'

const CurrentStepContent: FC<{ formState: CreateShipmentOrderFormState }> = ({
  formState
}) => {
  const step = formState.currentStep
  const completedSteps = formState.completedSteps()
  const allStepsCompleted = Object.values(completedSteps).indexOf(false) > -1

  if (step === CREATE_SHIPMENT_STEP.SENDER) {
    return (
      <CreateShipmentOrderAddresseeStep
        key={step}
        formState={formState}
        addressee={formState.shipmentOrder.sender!}
        headlineText={'Shipper information'}
        nextButtonActive={completedSteps[CREATE_SHIPMENT_STEP.SENDER]}
      />
    )
  }

  if (step === CREATE_SHIPMENT_STEP.ORIGIN_ADDRESS) {
    return (
      <CreateShipmentOrderAddressStep
        key={step}
        formState={formState}
        address={formState.shipmentOrder.originAddress!}
        nextButtonActive={completedSteps[CREATE_SHIPMENT_STEP.ORIGIN_ADDRESS]}
        headlineText={'Pickup address'}
      />
    )
  }

  if (step === CREATE_SHIPMENT_STEP.RECEIVER) {
    return (
      <CreateShipmentOrderAddresseeStep
        key={step}
        formState={formState}
        addressee={formState.shipmentOrder.receiver!}
        headlineText={'Receiver'}
        nextButtonActive={completedSteps[CREATE_SHIPMENT_STEP.RECEIVER]}
      />
    )
  }

  if (step === CREATE_SHIPMENT_STEP.DESTINATION_ADDRESS) {
    return (
      <CreateShipmentOrderAddressStep
        key={step}
        formState={formState}
        address={formState.shipmentOrder.destinationAddress!}
        headlineText={'Deliver to address'}
        nextButtonActive={
          completedSteps[CREATE_SHIPMENT_STEP.DESTINATION_ADDRESS]
        }
      />
    )
  }

  if (step === CREATE_SHIPMENT_STEP.SHIPMENT_DETAILS) {
    return (
      <CreateShipmentOrderShipmentDetailsStep
        key={step}
        formState={formState}
        shipmentDetails={formState.shipmentOrder.shipmentDetails!}
        headlineText={'Parcel infromation'}
        allStepsCompleted={allStepsCompleted}
      />
    )
  }

  return <></>
}

const CreateShipmentOrder: FC = () => {
  const formState = createShipmentOrderFormState.use()
  const completedSteps = formState.completedSteps()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
      <Card sx={{ width: '100%', maxWidth: '1200px' }}>
        <CardContent>
          <Stepper nonLinear activeStep={formState.getCurrentStepIndex()}>
            {formState.steps.map((step, index) => (
              <Step
                key={step.name}
                completed={
                  completedSteps[step.name] &&
                  formState.steps.length !== index + 1
                }
              >
                <StepButton
                  color="inherit"
                  onClick={() => formState.navigateToStep(step.name)}
                >
                  {step.text}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <CurrentStepContent formState={formState} />
          <ShipmentOrderConfirmationDialog formState={formState} />
        </CardContent>
      </Card>
    </Box>
  )
}

export { CreateShipmentOrder }
