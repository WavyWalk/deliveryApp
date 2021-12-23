import React, { FC, useMemo } from 'react'
import {
  Box,
  Button,
  LinearProgress,
  Link,
  Paper,
  Typography
} from '@mui/material'
import { SenderShipmentOrderListItem } from './SenderShipmentOrderListItem'
import { Link as RouterLink } from 'react-router-dom'
import {
  FULFILLMENT_STATE,
  ShipmentOrderFulfillment
} from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { PlainSelect } from '../../../../formelements/plainselect/PlainSelect'
import { nameOf } from '../../../../lib/typeutils/asKeyOf'
import { SenderShipmentOrderListState } from './SenderShipmentOrderListState'
import { fulfillmentFilterSelection } from './fulfillmentFilterSelection'

const SenderShipmentOrderList: FC = () => {
  const listState = useMemo(() => new SenderShipmentOrderListState(), []).use()

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
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        {!listState.userHasOrders && (
          <Box>
            {listState.fulfillmentStateFilter.currentState ===
            ('NO_FILTER' as FULFILLMENT_STATE) ? (
              <>
                <Typography sx={{ textAlign: 'center' }}>
                  Looks like you don't have orders yet.
                  <Link to={'/sender/createShipment'} component={RouterLink}>
                    <Button>Create one!</Button>
                  </Link>
                </Typography>
              </>
            ) : (
              <Typography sx={{ textAlign: 'center' }}>
                No orders found
              </Typography>
            )}
          </Box>
        )}
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
