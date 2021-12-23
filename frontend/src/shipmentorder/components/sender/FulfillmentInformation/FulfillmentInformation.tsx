import React, { FC, useMemo } from 'react'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import { FulfillmentInformationState } from './FulfillmentInformationState'

const FulfillmentInformation: FC<{
  fulfillment: ShipmentOrderFulfillment
}> = ({ fulfillment }) => {
  const state = useMemo(
    () => new FulfillmentInformationState(fulfillment),
    [fulfillment]
  ).use()

  const deliveryAgent = fulfillment?.deliveryAgent

  return (
    <Box sx={{ padding: 2 }}>
      {deliveryAgent && (
        <Box>
          <Typography>Deliverer contact data:</Typography>
          <Typography>{deliveryAgent?.personalData?.firstName}</Typography>
          <Typography>{`Tel. ${deliveryAgent?.personalData?.contactPhone}`}</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stepper orientation={'vertical'} activeStep={state.currentStepIndex}>
          {state.steps.map((step, index) => {
            return (
              <Step key={step.key} completed={state.currentStepIndex >= index}>
                <StepLabel>{step.name}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </Box>
    </Box>
  )
}

export { FulfillmentInformation }
