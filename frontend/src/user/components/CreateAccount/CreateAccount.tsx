import React, { useMemo } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Link,
  Typography
} from '@mui/material'
import { CreateAccountFormState } from './CreateAccountFormState'
import { PlainInput } from '../../../formelements/plaininput/PlainInput'
import { asKeyOf } from '../../../lib/typeutils/asKeyOf'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useCreateAccountSxStyles } from './useCreateAccountSxStyles'
import { CreateAccountDelivererFields } from './CreateAccountDelivererFields'
import { AuthenticationData } from '../../model/authenticationdata/AuthenticationData'

const CreateAccount = () => {
  const formState = useMemo(() => new CreateAccountFormState(), []).use()
  const navigate = useNavigate()
  const authenticationData = formState.user.authenticationData!
  const sx = useCreateAccountSxStyles()

  return (
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
        <Box sx={sx.submitGroup}>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}
          >
            <Button
              size="large"
              type={'submit'}
              onClick={() => formState.submit(navigate)}
              disabled={formState.submitting}
            >
              Create account
              {formState.submitting && <CircularProgress size={0.5} />}
            </Button>
          </Box>
          {!formState.isDelivererMode && (
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 2
              }}
            >
              <Link onClick={formState.initializeRegisterAsDeliverer}>
                <Typography fontWeight={'bold'}>
                  I want to register as deliverer
                </Typography>
              </Link>
            </Box>
          )}
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
