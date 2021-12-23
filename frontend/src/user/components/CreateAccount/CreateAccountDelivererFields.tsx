import React, { FC } from 'react'
import { CreateAccountFormState } from './CreateAccountFormState'
import { Box } from '@mui/material'
import { PlainInput } from '../../../formelements/plaininput/PlainInput'
import { nameOf } from '../../../lib/typeutils/asKeyOf'
import { useCreateAccountSxStyles } from './useCreateAccountSxStyles'
import { PersonalData } from '../../model/personaldata/PersonalData'

export const CreateAccountDelivererFields: FC<{
  formState: CreateAccountFormState
}> = ({ formState }) => {
  formState.use()
  const personalData = formState.user.personalData!
  const sx = useCreateAccountSxStyles()

  return (
    <Box>
      <Box>
        <PlainInput
          required
          sx={sx.textField}
          label={'first name'}
          model={personalData}
          formState={formState}
          validateFunc={personalData.validator.firstName}
          property={nameOf<PersonalData>('firstName')}
        />
      </Box>
      <Box>
        <PlainInput
          required
          sx={sx.textField}
          label={'last name'}
          model={personalData}
          formState={formState}
          validateFunc={personalData.validator.lastName}
          property={nameOf<PersonalData>('lastName')}
        />
      </Box>
      <Box>
        <PlainInput
          required
          sx={sx.textField}
          label={'phone number'}
          model={personalData}
          formState={formState}
          validateFunc={personalData.validator.contactPhone}
          property={nameOf<PersonalData>('contactPhone')}
        />
      </Box>
    </Box>
  )
}
