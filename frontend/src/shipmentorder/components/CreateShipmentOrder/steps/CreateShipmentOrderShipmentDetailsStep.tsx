import React, { FC } from 'react'
import { CreateShipmentOrderFormState } from '../CreateShipmentOrderFormState'
import { Box, Button, Typography } from '@mui/material'
import {
  availableParcels,
  handlingLabels,
  ShipmentDetails
} from '../../../model/ShipmentDetails'
import { PlainInput } from '../../../../formelements/plaininput/PlainInput'
import { nameOf } from '../../../../lib/typeutils/asKeyOf'
import { useShipmentStepSharedSx } from './useShipmentStepSharedSx'
import { PlainSelect } from '../../../../formelements/plainselect/PlainSelect'

const parcelSelection = Object.keys(availableParcels).map((key) => ({
  text: (availableParcels as any)[key],
  value: key
}))

const handlingLabelsSelection = Object.keys(handlingLabels).map((key) => ({
  text: (handlingLabels as any)[key],
  value: key
}))

const CreateShipmentOrderShipmentDetailsStep: FC<{
  formState: CreateShipmentOrderFormState
  shipmentDetails: ShipmentDetails
  headlineText: string
  allStepsCompleted: boolean
}> = ({ formState, shipmentDetails, headlineText, allStepsCompleted }) => {
  formState.use()
  const sx = useShipmentStepSharedSx()

  return (
    <Box>
      <Box sx={sx.headline}>
        <Typography variant={'h3'} textAlign={'center'}>
          {headlineText}
        </Typography>
      </Box>
      <Box sx={sx.inputWrapBox}>
        <PlainSelect
          sx={sx.plainInput}
          model={shipmentDetails}
          formState={formState}
          label={'parcel type'}
          property={nameOf<ShipmentDetails>('parcelType')}
          selectPairs={parcelSelection}
        />
      </Box>
      <Box sx={sx.inputWrapBox}>
        <PlainSelect
          sx={sx.plainInput}
          model={shipmentDetails}
          formState={formState}
          label={'handling label'}
          property={nameOf<ShipmentDetails>('safeHandlingLabel')}
          selectPairs={handlingLabelsSelection}
        />
      </Box>
      <Box sx={sx.inputWrapBox}>
        <PlainInput
          sx={sx.plainInput}
          model={shipmentDetails}
          formState={formState}
          label={'your not to deliverer'}
          property={nameOf<ShipmentDetails>('noteToDeliveryAgent')}
        />
      </Box>
      <Box sx={sx.controlButtons}>
        <Box sx={{ marginRight: 2 }}>
          <Button variant={'outlined'} onClick={formState.goPreviousStep}>
            Go back
          </Button>
        </Box>
        <Box>
          <Button
            disabled={allStepsCompleted}
            onClick={() => formState.setVerificationDialogIsOpen(true)}
            variant={'contained'}
          >
            verify and submit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export { CreateShipmentOrderShipmentDetailsStep }
