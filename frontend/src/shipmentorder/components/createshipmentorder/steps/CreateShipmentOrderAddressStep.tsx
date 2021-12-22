import React, { FC } from 'react'
import { CreateShipmentOrderFormState } from '../../../formstates/CreateShipmentOrderFormState'
import { Box, Button, Typography } from '@mui/material'
import { PlainInput } from '../../../../formelements/plaininput/PlainInput'
import { nameOf } from '../../../../lib/typeutils/asKeyOf'
import { Address } from '../../../../address/model/Address'
import { useShipmentStepSharedSx } from './useShipmentStepSharedSx'

const CreateShipmentOrderAddressStep: FC<{
  formState: CreateShipmentOrderFormState
  address: Address
  nextButtonActive: boolean
  headlineText: React.ReactNode
}> = ({ formState, address, nextButtonActive, headlineText }) => {
  formState.use()
  const sx = useShipmentStepSharedSx()

  return (
    <Box>
      <Box sx={sx.headline}>
        <Typography textAlign={'center'} variant={'h4'}>
          {headlineText}
        </Typography>
      </Box>
      <Box sx={sx.inputWrapBox}>
        <PlainInput
          required
          sx={sx.plainInput}
          model={address}
          label={'country'}
          validateFunc={address.validator.country}
          formState={formState}
          property={nameOf<Address>('country')}
        />
      </Box>
      <Box sx={sx.groupByTwoInputs}>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            required
            model={address}
            label={'PLZ'}
            sx={sx.plainInput}
            formState={formState}
            validateFunc={address.validator.postalCode}
            property={nameOf<Address>('postalCode')}
          />
        </Box>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            required
            model={address}
            label={'City'}
            sx={sx.plainInput}
            formState={formState}
            validateFunc={address.validator.locality}
            property={nameOf<Address>('locality')}
          />
        </Box>
      </Box>
      <Box sx={sx.groupByTwoInputs}>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            required
            model={address}
            label={'street'}
            sx={sx.plainInput}
            formState={formState}
            validateFunc={address.validator.street}
            property={nameOf<Address>('street')}
          />
        </Box>
        <Box sx={sx.inputWrapBox}>
          <PlainInput
            required
            model={address}
            label={'street number'}
            sx={sx.plainInput}
            formState={formState}
            validateFunc={address.validator.streetNumber}
            property={nameOf<Address>('streetNumber')}
          />
        </Box>
      </Box>
      <Box sx={sx.controlButtons}>
        <Box>
          <Button onClick={formState.goPreviousStep}>Go back</Button>
        </Box>
        <Box>
          <Button onClick={formState.goNextStep} disabled={!nextButtonActive}>
            Go next
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export { CreateShipmentOrderAddressStep }
