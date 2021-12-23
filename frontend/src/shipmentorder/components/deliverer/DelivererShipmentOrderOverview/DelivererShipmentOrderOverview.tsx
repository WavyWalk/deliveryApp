import React, { FC, useEffect, useMemo } from 'react'
import { Box, Card, CardContent, Divider, LinearProgress } from '@mui/material'
import { useParams } from 'react-router-dom'
import { AddressDetails } from '../../../../address/components/ShowAddressDetails'
import { theme } from '../../../../theme/theme'
import { ShipmentDetailsInfo } from '../../sender/SenderShowShipmentDetails'
import { DelivererShipmentOrderFulfillmentControls } from '../DelivererShipmentOrderFulfillmentControls/DelivererShipmentOrderFulfillmentControls'
import { DelivererShipmentOrderOverviewState } from './DelivererShipmentOrderOverviewState'

const DelivererShipmentOrderOverview: FC = () => {
  const state = useMemo(
    () => new DelivererShipmentOrderOverviewState(),
    []
  ).use()
  const { shipmentOrderId } = useParams()
  const shipmentOrder = state.shipmentOrder

  useEffect(() => {
    if (shipmentOrderId) {
      void state.fetchShipmentOrder(shipmentOrderId)
    }
  }, [])

  if (!shipmentOrder) {
    return (
      <Card>
        <LinearProgress />
      </Card>
    )
  }

  const {
    originAddress,
    sender,
    receiver,
    shipmentDetails,
    destinationAddress,
    fulfillment
  } = state.shipmentOrder ?? {}

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              lg: 'row',
              xs: 'column'
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              lg: 'column',
              xs: 'row'
            }
          }}
        >
          <Box sx={{ flex: 1, padding: theme.spacing(2, 3) }}>
            <ShipmentDetailsInfo shipmentDetails={shipmentDetails!} />
          </Box>
        </Box>
        {fulfillment && (
          <DelivererShipmentOrderFulfillmentControls
            fulfillment={fulfillment}
          />
        )}
      </CardContent>
    </Card>
  )
}

export { DelivererShipmentOrderOverview }
