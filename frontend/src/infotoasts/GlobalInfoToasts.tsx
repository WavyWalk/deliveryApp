import React, { FC } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { globalInfoToastsState } from './globalInfoToastsState'

const anchorOrigin = { vertical: 'top', horizontal: 'center' } as const

export const GlobalInfoToasts: FC = () => {
  const state = globalInfoToastsState.use()

  return (
    <>
      <Snackbar
        key={state.infoToast?.message}
        open={!!state.infoToast}
        autoHideDuration={state.infoToast?.duration}
        onClose={state.close}
        anchorOrigin={anchorOrigin}
      >
        <Alert onClose={state.close} severity="success" sx={{ width: '100%' }}>
          {state.infoToast?.message}
        </Alert>
      </Snackbar>
    </>
  )
}
