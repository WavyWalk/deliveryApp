import React, { FC, useMemo } from 'react'
import {
  Box,
  Button,
  LinearProgress,
  Link,
  Paper,
  Typography
} from '@mui/material'
import { ShipmentOrder } from '../../model/ShipmentOrder'
import { SessionState, sessionState } from '../../../user/SessionState'
import { shipmentOrderClient } from '../../client/ShipmentOrderClient'
import { SenderShipmentOrderListItem } from './SenderShipmentOrderListItem'
import { SubscriptionState } from '../../../lib/statemanagement'
import { Link as RouterLink } from 'react-router-dom'

class SenderShipmentOrderListState extends SubscriptionState {
  isLoading = false

  shipmentOrders: ShipmentOrder[] = []
  userHasOrders: boolean = true

  setIsLoading = (value: boolean) => {
    this.isLoading = value
    this.update()
  }

  constructor(private sessionState: SessionState) {
    super()
    void this.fetchShipmentOrders()
  }

  fetchShipmentOrders = async () => {
    try {
      this.setIsLoading(true)
      const shipmentOrders =
        await shipmentOrderClient.getShipmentOrdersForCustomer(
          this.sessionState.currentUser?._id!
        )
      this.userHasOrders = shipmentOrders.length > 0
      this.shipmentOrders = shipmentOrders
      this.update()
    } finally {
      this.setIsLoading(false)
    }
  }
}

const SenderShipmentOrderList: FC = () => {
  const listState = useMemo(
    () => new SenderShipmentOrderListState(sessionState),
    []
  ).use()

  return (
    <Paper>
      <Box>
        <Typography sx={{ padding: 2.5, textAlign: 'center' }} variant={'h2'}>
          Your parcels
        </Typography>
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
            <Typography>
              Looks like you don't have orders yet.
              <Link to={'/sender/createShipment'} component={RouterLink}>
                <Button>Create one!</Button>
              </Link>
            </Typography>
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
