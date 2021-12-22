import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Link,
  SxProps,
  Typography
} from '@mui/material'
import { createAccountFormState } from '../formstates/CreateAccountFormState'
import { PlainInput } from '../../formelements/plaininput/PlainInput'
import { asKeyOf } from '../../lib/typeutils/asKeyOf'
import { AuthenticationData } from '../model/IUser'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link as RouterLink } from 'react-router-dom'

const createSxStyles = () => {
  const card: SxProps = {
    width: '60%',
    position: 'absolute',
    top: '20%',
    left: '25%'
  } as const

  const inputs: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 2
  } as const

  const textField: SxProps = {
    width: '100%',
    marginBottom: 1
  } as const

  const submitGroup: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  } as const

  return {
    card,
    inputs,
    textField,
    submitGroup
  }
}

const CreateAccount = () => {
  const formState = createAccountFormState.use()
  const authenticationData = formState.user.authenticationData!
  const sx = createSxStyles()

  return (
    <Card sx={sx.card}>
      <CardHeader title={'Create an account'} />
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
            />
          </Box>
          <Box display={'flex'} flexDirection={'column'}>
            <PlainInput
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
        <Box sx={sx.submitGroup}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}
          >
            <Button
              size="large"
              type={'submit'}
              onClick={formState.submit}
              disabled={formState.submitting}
            >
              Create account
              {formState.submitting && <CircularProgress size={0.5} />}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={'/login'} component={RouterLink}>
              <Typography fontSize={'smaller'}>
                I have an account and want to login
              </Typography>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export { CreateAccount }
