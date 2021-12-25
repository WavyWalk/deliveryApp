import React, { FC, useMemo } from 'react'
import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import { SenderShipmentOrderListItem } from './SenderShipmentOrderListItem'
import { ShipmentOrderFulfillment } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { PlainSelect } from '../../../../formelements/plainselect/PlainSelect'
import { nameOf } from '../../../../lib/typeutils/asKeyOf'
import { SenderShipmentOrderListState } from './SenderShipmentOrderListState'
import { fulfillmentFilterSelection } from './fulfillmentFilterSelection'
import { SenderShipmentOrderListNoOrderDisclaimer } from './SenderShipmentOrderListNoOrderDisclaimer'

const SenderShipmentOrderList: FC = () => {
  const listState = useMemo(() => new SenderShipmentOrderListState(), []).use()
  listState.useCleanup()

  return (
    <Paper>
      <Box>
        <Typography sx={{ padding: 2.5, textAlign: 'center' }} variant={'h2'}>
          Your parcels
        </Typography>
        <Box>
          <PlainSelect
            sx={{ width: '100%', margin: 2 }}
            label={'Filter by status'}
            model={listState.fulfillmentStateFilter}
            formState={listState}
            property={nameOf<ShipmentOrderFulfillment>('currentState')}
            selectPairs={fulfillmentFilterSelection}
            onSelect={listState.fetchShipmentOrders}
          />
        </Box>
        {listState.isLoading && <LinearProgress />}
        <SenderShipmentOrderListNoOrderDisclaimer listState={listState} />
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
            <SenderShipmentOrderListItem
              key={index}
              shipmentOrder={shipmentOrder}
            />
          )
        })}
      </Box>
    </Paper>
  )
}

export { SenderShipmentOrderList }
