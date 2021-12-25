import React, { FC, useMemo } from 'react'
import { CreateShipmentOrderFormState } from './CreateShipmentOrderFormState'
import {
  Box,
  Card,
  CardContent,
  Step,
  StepContent,
  StepLabel,
  Stepper
} from '@mui/material'
import { ShipmentOrderConfirmationDialog } from './ShipmentOrderConfirmationDialog'
import { CreateShipmentOrderCurrentStepContent } from './CreateShipmentOrderCurrentStepContent'

const CreateShipmentOrder: FC = () => {
  const formState = useMemo(() => new CreateShipmentOrderFormState(), []).use()
  const completedSteps = formState.completedSteps()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
      <Card sx={{ width: '100%', maxWidth: '1200px' }}>
        <CardContent>
          <Stepper
            orientation={'vertical'}
            nonLinear
            activeStep={formState.getCurrentStepIndex()}
          >
            {formState.steps.map((step, index) => (
              <Step
                key={step.name}
                completed={
                  completedSteps[step.name] &&
                  formState.steps.length !== index + 1
                }
              >
                <StepLabel
                  color="inherit"
                  onClick={() => formState.navigateToStep(step.name)}
                  sx={{ cursor: 'pointer' }}
                >
                  {step.text}
                </StepLabel>
                <StepContent>
                  <CreateShipmentOrderCurrentStepContent
                    formState={formState}
                  />
                </StepContent>
              </Step>
            ))}
          </Stepper>
          <ShipmentOrderConfirmationDialog formState={formState} />
        </CardContent>
      </Card>
    </Box>
  )
}

export { CreateShipmentOrder }
