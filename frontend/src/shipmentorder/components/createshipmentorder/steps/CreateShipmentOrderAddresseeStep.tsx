import React, { FC } from 'react'
import { CreateShipmentOrderFormState } from '../../../formstates/CreateShipmentOrderFormState'
import { Box, Button, Typography } from '@mui/material'
import { PlainInput } from '../../../../formelements/plaininput/PlainInput'
import { nameOf } from '../../../../lib/typeutils/asKeyOf'
import { Addressee, IAddressee } from '../../../../actor/Sender'
import { useShipmentStepSharedSx } from './useShipmentStepSharedSx'

const CreateShipmentOrderAddresseeStep: FC<{
  formState: CreateShipmentOrderFormState
  addressee: Addressee
  headlineText: string
  nextButtonActive: boolean
}> = ({ formState, addressee, headlineText, nextButtonActive }) => {
  formState.use()
  const sx = useShipmentStepSharedSx()

  return (
    <Box>
      <Box sx={sx.headline}>
        <Typography variant={'h3'} textAlign={'center'}>
          {headlineText}
        </Typography>
      </Box>
      <Box sx={sx.groupByTwoInputs}>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            required
            sx={sx.plainInput}
            model={addressee}
            label={'first name'}
            formState={formState}
            validateFunc={addressee.validator.firstName}
            property={nameOf<IAddressee>('firstName')}
          />
        </Box>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            required
            sx={sx.plainInput}
            model={addressee}
            label={'last name'}
            formState={formState}
            validateFunc={addressee.validator.lastName}
            property={nameOf<IAddressee>('lastName')}
          />
        </Box>
      </Box>
      <Box sx={sx.groupByTwoInputs}>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            sx={sx.plainInput}
            model={addressee}
            label={'email'}
            formState={formState}
            validateFunc={addressee.validator.contactEmail}
            property={nameOf<IAddressee>('contactEmail')}
          />
        </Box>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            required
            sx={sx.plainInput}
            model={addressee}
            label={'phone'}
            formState={formState}
            validateFunc={addressee.validator.contactPhone}
            property={nameOf<IAddressee>('contactPhone')}
          />
        </Box>
      </Box>
      <Box sx={sx.controlButtons}>
        {formState.getCurrentStepIndex() !== 0 && (
          <Box>
            <Button onClick={formState.goPreviousStep}>Go back</Button>
          </Box>
        )}
        <Box>
          <Button onClick={formState.goNextStep} disabled={!nextButtonActive}>
            Go next
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export { CreateShipmentOrderAddresseeStep }
