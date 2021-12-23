import {
  FULFILLMENT_STATE,
  ShipmentOrderFulfillment
} from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import React, { FC, useMemo } from 'react'
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  useTheme
} from '@mui/material'
import { PlainSelect } from '../../../../formelements/plainselect/PlainSelect'
import { nameOf } from '../../../../lib/typeutils/asKeyOf'
import { DelivererShipmentOrderFulfillmentControlsState } from './DelivererShipmentOrderFulfillmentControlsState'

export const DelivererShipmentOrderFulfillmentControls: FC<{
  fulfillment: ShipmentOrderFulfillment
}> = ({ fulfillment }) => {
  const state = useMemo(
    () => new DelivererShipmentOrderFulfillmentControlsState(fulfillment),
    [fulfillment]
  ).use()

  const currentState = state.fulfillment.currentState
  const theme = useTheme()

  return (
    <Box>
      {currentState === FULFILLMENT_STATE.NEW_UNPROCESSED ? (
        <Box>
          <Button variant={'contained'} disabled={!!state.isLoadingForStep}>
            ACCEPT FOR FULFILLMENT
          </Button>
        </Box>
      ) : (
        <Box sx={{ padding: theme.spacing(1, 4) }}>
          <Typography fontWeight={'bold'}>Update status:</Typography>
          <PlainSelect
            sx={{ width: '100%', marginTop: 1 }}
            model={fulfillment}
            formState={state}
            property={nameOf<ShipmentOrderFulfillment>('currentState')}
            selectPairs={state.fulfillmentSelection}
            disabled={!!state.isLoadingForStep}
            customSetter={(value: FULFILLMENT_STATE) => {
              fulfillment.currentState = value
              void state.updateFulfillmentState(value)
            }}
          />
        </Box>
      )}
      {state.isLoadingForStep && <LinearProgress />}
    </Box>
  )
}
