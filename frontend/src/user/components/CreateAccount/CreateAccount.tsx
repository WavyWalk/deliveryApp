import React, { FC, useMemo } from 'react'
import { Box, Card, CardContent, CardHeader, IconButton } from '@mui/material'
import { CreateAccountFormState } from './CreateAccountFormState'
import { PlainInput } from '../../../formelements/plaininput/PlainInput'
import { asKeyOf } from '../../../lib/typeutils/asKeyOf'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useCreateAccountSxStyles } from './useCreateAccountSxStyles'
import { CreateAccountDelivererFields } from './CreateAccountDelivererFields'
import { AuthenticationData } from '../../model/authenticationdata/AuthenticationData'
import { CreateAccountControlsGroup } from './CreateAccountControlsGroup'
import { CreateAccountAppBar } from './CreateAccountAppBar'

const CreateAccount: FC = () => {
  const formState = useMemo(() => new CreateAccountFormState(), []).use()
  const authenticationData = formState.user.authenticationData!
  const sx = useCreateAccountSxStyles()

  return (
    <Box>
      <CreateAccountAppBar />
      <Card sx={sx.card}>
        <CardHeader title={'Create an account'} />
        <CardContent>
          <Box sx={sx.inputs}>
            <Box width={'100%'}>
              <PlainInput
                required
                model={authenticationData}
                formState={formState}
                property={asKeyOf<AuthenticationData>('email')}
                label={'email'}
                sx={sx.textField}
                validateFunc={authenticationData.validator.email}
              />
            </Box>
            <Box display={'flex'} flexDirection={'column'}>
              <PlainInput
                required
                label={'password'}
                type={formState.showPassword ? undefined : 'password'}
                model={formState.user.authenticationData!}
                formState={formState}
                property={asKeyOf<AuthenticationData>('password')}
                sx={sx.textField}
                validateFunc={authenticationData.validator.password}
                inputProps={{
                  endAdornment: (
                    <IconButton onClick={formState.toggleShowPassword}>
                      {formState.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  )
                }}
              />
            </Box>
            <Box>
              <PlainInput
                label={'confirm your password'}
                type={formState.showPassword ? undefined : 'password'}
                model={formState.user.authenticationData!}
                formState={formState}
                property={asKeyOf<AuthenticationData>('passwordConfirmation')}
                sx={sx.textField}
                validateFunc={authenticationData.validator.passwordConfirmation}
              />
            </Box>
          </Box>
          {formState.isDelivererMode && (
            <Box>
              <CreateAccountDelivererFields formState={formState} />
            </Box>
          )}
          <CreateAccountControlsGroup formState={formState} />
        </CardContent>
      </Card>
    </Box>
  )
}

export { CreateAccount }
