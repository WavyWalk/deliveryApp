import React, { FC } from 'react'
import { Box, Button, Link, Typography } from '@mui/material'
import { FULFILLMENT_STATE } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { Link as RouterLink } from 'react-router-dom'
import { SenderShipmentOrderListState } from './SenderShipmentOrderListState'

const SenderShipmentOrderListNoOrderDisclaimer: FC<{
  listState: SenderShipmentOrderListState
}> = ({ listState }) => {
  listState.use()

  return (
    <>
      {!listState.userHasOrders && (
        <Box
          sx={{
            padding: 3,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {listState.fulfillmentStateFilter.currentState ===
          ('NO_FILTER' as FULFILLMENT_STATE) ? (
            <>
              <Typography sx={{ textAlign: 'center' }}>
                Looks like you don't have orders yet.
              </Typography>
              <Link to={'/sender/createShipment'} component={RouterLink}>
                <Button variant={'contained'}>Create one!</Button>
              </Link>
            </>
          ) : (
            <Typography sx={{ textAlign: 'center' }}>
              No orders found
            </Typography>
          )}
        </Box>
      )}
    </>
  )
}

export { SenderShipmentOrderListNoOrderDisclaimer }
