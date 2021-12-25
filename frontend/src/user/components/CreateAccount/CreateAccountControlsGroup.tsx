import React, { FC } from 'react'
import { CreateAccountFormState } from './CreateAccountFormState'
import { useCreateAccountSxStyles } from './useCreateAccountSxStyles'
import { useNavigate } from 'react-router-dom'
import { Box, Button, CircularProgress, Link, Typography } from '@mui/material'

const CreateAccountControlsGroup: FC<{
  formState: CreateAccountFormState
}> = ({ formState }) => {
  formState.use()
  const sx = useCreateAccountSxStyles()
  const navigate = useNavigate()

  return (
    <Box sx={sx.submitGroup}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 2
        }}
      >
        <Button
          size="large"
          type={'submit'}
          variant={'contained'}
          onClick={() => formState.submit(navigate)}
          disabled={formState.submitting}
          sx={{ marginBottom: 2 }}
        >
          Create account
          {formState.submitting && <CircularProgress size={0.5} />}
        </Button>
      </Box>

      <Box
        sx={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 3
        }}
      >
        <Link onClick={formState.toggleRoleMode}>
          <Typography fontWeight={'bold'}>
            I want to register as{' '}
            {formState.isDelivererMode ? 'sender' : 'deliverer'}
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export { CreateAccountControlsGroup }
