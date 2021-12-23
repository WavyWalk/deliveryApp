import React, { FC, useMemo } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Typography
} from '@mui/material'
import { PlainInput } from '../../../formelements/plaininput/PlainInput'
import { asKeyOf } from '../../../lib/typeutils/asKeyOf'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { LoginFormState } from './LoginFormState'
import { useLoginSxStyles } from './UseLoginSxStyles'
import { useNavigate } from 'react-router-dom'
import { AuthenticationData } from '../../model/authenticationdata/AuthenticationData'

const Login: FC = () => {
  const formState = useMemo(() => new LoginFormState(), []).use()
  const authenticationData = formState.authenticationData
  const sx = useLoginSxStyles()
  const navigateFunc = useNavigate()

  return (
    <Card sx={sx.card}>
      <CardHeader title={'Sign in with your account'} />
      <CardContent>
        <Box sx={sx.inputs}>
          <Box width={'100%'}>
            <PlainInput
              model={authenticationData}
              formState={formState}
              property={asKeyOf<AuthenticationData>('email')}
              label={'email'}
              sx={sx.textField}
              validateFunc={authenticationData.validator.email}
              additionallyOnChange={formState.clearGeneralError}
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <PlainInput
              label={'password'}
              type={formState.showPassword ? undefined : 'password'}
              model={authenticationData}
              formState={formState}
              property={asKeyOf<AuthenticationData>('password')}
              sx={sx.textField}
              validateFunc={authenticationData.validator.password}
              additionallyOnChange={formState.clearGeneralError}
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
        </Box>
        {formState.hasLoginError && (
          <Typography sx={{ color: 'red' }}>Invalid credentials</Typography>
        )}
        <Box sx={sx.submitGroup}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}
          >
            <Button
              size="large"
              onClick={() => formState.submit(navigateFunc)}
              disabled={formState.submitting}
            >
              Login
              {formState.submitting && <CircularProgress size={0.5} />}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export { Login }
