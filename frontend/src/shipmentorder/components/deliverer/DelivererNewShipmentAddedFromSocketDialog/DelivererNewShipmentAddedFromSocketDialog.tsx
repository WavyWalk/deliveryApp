import React, { FC } from 'react'
import { DelivererShipmentOrderListState } from '../DelivererShipmentOrderLIst/DelivererShipmentOrderListState'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { DelivererShipmentOrderListItem } from '../DelivererShipmentOrderListItem/DelivererShipmentOrderListItem'

const DelivererNewShipmentAddedFromSocketDialog: FC<{
  state: DelivererShipmentOrderListState
}> = ({ state }) => {
  state.use()

  const shipmentOrder = state.lastAddedFromSocket

  if (!shipmentOrder) {
    return <></>
  }

  return (
    <Dialog
      open={state.lastAddedFromSocketModelOpened}
      onClose={() => {
        state.setLastAddedFromSocketModelOpened(false)
      }}
      fullWidth={true}
    >
      <DialogTitle>New order was placed!</DialogTitle>
      <DialogContent>
        <DelivererShipmentOrderListItem
          shipmentOrder={state.lastAddedFromSocket!}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant={'outlined'}
          onClick={() => state.setLastAddedFromSocketModelOpened(false)}
        >
          Not interested
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { DelivererNewShipmentAddedFromSocketDialog }
