import React, { FC, useMemo } from 'react'
import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import { DelivererShipmentOrderListState } from './DelivererShipmentOrderListState'
import { PlainSelect } from '../../../../formelements/plainselect/PlainSelect'
import { nameOf } from '../../../../lib/typeutils/asKeyOf'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { delivererOrderListFulfillmentFilterSelection } from './delivererOrderListFulfillmentFilterSelection'
import { DelivererShipmentOrderListItem } from '../DelivererShipmentOrderListItem/DelivererShipmentOrderListItem'
import { DelivererNewShipmentAddedFromSocketDialog } from '../DelivererNewShipmentAddedFromSocketDialog/DelivererNewShipmentAddedFromSocketDialog'

const DelivererShipmentOrderList: FC = () => {
  const listState = useMemo(
    () => new DelivererShipmentOrderListState(),
    []
  ).use()

  listState.useCleanup()

  return (
    <Paper>
      <Box>
        <DelivererNewShipmentAddedFromSocketDialog state={listState} />
        <Typography sx={{ padding: 2.5, textAlign: 'center' }} variant={'h2'}>
          Browse parcels
        </Typography>
        <Box>
          <PlainSelect
            sx={{ width: '100%', margin: 2 }}
            label={'Filter by status'}
            model={listState.fulfillmentStateFilter}
            formState={listState}
            property={nameOf<ShipmentOrderFulfillment>('currentState')}
            selectPairs={delivererOrderListFulfillmentFilterSelection}
            onSelect={listState.fetchShipmentOrders}
          />
        </Box>
        {listState.isLoading && <LinearProgress />}
      </Box>
      {!listState.noOrders && (
        <Box>
          <Typography sx={{ textAlign: 'center' }}>No orders found</Typography>
        </Box>
      )}
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
