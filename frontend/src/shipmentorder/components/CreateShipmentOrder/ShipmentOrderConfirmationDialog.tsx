import React, { FC } from 'react'
import { CreateShipmentOrderFormState } from './CreateShipmentOrderFormState'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from '@mui/material'
import { AddressDetails } from '../../../address/components/ShowAddressDetails'
import { ShipmentDetailsInfo } from '../sender/SenderShowShipmentDetails'
import { useNavigate } from 'react-router-dom'

const ShipmentOrderConfirmationDialog: FC<{
  formState: CreateShipmentOrderFormState
}> = ({ formState }) => {
  const {
    originAddress,
    sender,
    receiver,
    shipmentDetails,
    destinationAddress
  } = formState.shipmentOrder

  const navigate = useNavigate()

  return (
    <Dialog
      open={formState.verificationDialogIsOpen}
      onClose={() => {
        formState.setVerificationDialogIsOpen(false)
      }}
      fullWidth={true}
    >
      <DialogTitle>Verify and submit</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              lg: 'column',
              xs: 'row'
            }
          }}
        >
          <Box sx={{ flex: 1 }}>
            <AddressDetails
              headline={'sender:'}
              address={originAddress!}
              addressee={sender!}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <AddressDetails
              headline={'receiver:'}
              address={destinationAddress!}
              addressee={receiver!}
            />
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Box sx={{ maxWidth: '60%' }}>
            <ShipmentDetailsInfo shipmentDetails={shipmentDetails!} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant={'outlined'}
          onClick={() => formState.setVerificationDialogIsOpen(false)}
        >
          I forgot something
        </Button>
        <Button
          variant={'contained'}
          onClick={() => formState.submit(navigate)}
        >
          SUBMIT!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { ShipmentOrderConfirmationDialog }
