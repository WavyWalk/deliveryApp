import React, { FC } from 'react'
import { CreateShipmentOrderFormState } from '../../formstates/CreateShipmentOrderFormState'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material'
import { Address } from '../../../address/model/Address'
import { Addressee } from '../../../actor/Sender'
import {
  availableParcels,
  handlingLabels,
  ShipmentDetails
} from '../../model/ShipmentDetails'

const AddressDetails: FC<{
  address: Address
  addressee: Addressee
  headline: string
}> = ({ address, addressee, headline }) => {
  return (
    <Box sx={{ padding: (theme) => theme.spacing(0, 3) }}>
      <Box>
        <Typography fontWeight={'bold'}>{headline}</Typography>
        <Box>
          <Typography>{address.country}</Typography>
          <Typography>{`${address.postalCode}, ${address.locality}`}</Typography>
          <Typography>{`${address.street}, ${address.streetNumber}`}</Typography>
          <Typography>{`${addressee.firstName} ${addressee.lastName}`}</Typography>
          <Typography>
            {addressee.contactPhone ? `Tel: ${addressee.contactPhone} ` : ''}
            {addressee.contactEmail ? `Email: ${addressee.contactEmail}` : ''}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const ShipmentDetailsInfo: FC<{ shipmentDetails: ShipmentDetails }> = ({
  shipmentDetails
}) => {
  return (
    <Box>
      <Typography fontWeight={'bold'}>Parcel informaton</Typography>
      <Typography>
        parcel size:
        {(availableParcels as Record<any, any>)[shipmentDetails.parcelType!]}
      </Typography>
      {shipmentDetails.safeHandlingLabel !== 'regular' && (
        <Typography fontSize={'bold'}>
          special handling:{' '}
          {
            (handlingLabels as Record<any, any>)[
              shipmentDetails.safeHandlingLabel!
            ]
          }
        </Typography>
      )}
      {shipmentDetails.noteToDeliveryAgent && (
        <Box>
          <Typography>Note to deliverer</Typography>
          <Typography>{shipmentDetails.noteToDeliveryAgent}</Typography>
        </Box>
      )}
    </Box>
  )
}

const ShipmentOrderConfirmationDialog: FC<{
  formState: CreateShipmentOrderFormState
}> = ({ formState }) => {
  const sender = formState.shipmentOrder.sender!
  const receiver = formState.shipmentOrder.receiver!
  const originAddress = formState.shipmentOrder.originAddress!
  const destinationAddress = formState.shipmentOrder.destinationAddress!
  const shipmentDetails = formState.shipmentOrder.shipmentDetails!

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
              address={originAddress}
              addressee={sender}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <AddressDetails
              headline={'receiver:'}
              address={destinationAddress}
              addressee={receiver}
            />
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Box sx={{ maxWidth: '60%' }}>
            <ShipmentDetailsInfo shipmentDetails={shipmentDetails} />
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
        <Button variant={'contained'} onClick={formState.submit}>
          SUBMIT!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { ShipmentOrderConfirmationDialog }
