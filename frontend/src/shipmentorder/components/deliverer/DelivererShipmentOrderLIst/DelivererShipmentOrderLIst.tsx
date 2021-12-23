import React, { FC, useMemo } from 'react'
import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import { sessionState } from '../../../../user/SessionState'
import { DelivererShipmentOrderListItem } from '../DelivererShipmentOrderListItem/DelivererShipmentOrderListItem'
import { DelivererShipmentOrderListState } from './DelivererShipmentOrderListState'

const DelivererShipmentOrderList: FC = () => {
  const listState = useMemo(
    () => new DelivererShipmentOrderListState(sessionState),
    []
  ).use()

  return (
    <Paper>
      <Box>
        <Typography sx={{ padding: 2.5, textAlign: 'center' }} variant={'h4'}>
          OpenOrders
        </Typography>
        {listState.noOpenOrders && (
          <Typography variant={'h3'} sx={{ textAlign: 'center', margin: 3 }}>
            No open orders
          </Typography>
        )}
        {listState.isLoading && <LinearProgress />}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {listState.shipmentOrders.map((shipmentOrder, index) => {
          return (
            <DelivererShipmentOrderListItem
              key={index}
              shipmentOrder={shipmentOrder}
            />
          )
        })}
      </Box>
    </Paper>
  )
}

export { DelivererShipmentOrderList }
