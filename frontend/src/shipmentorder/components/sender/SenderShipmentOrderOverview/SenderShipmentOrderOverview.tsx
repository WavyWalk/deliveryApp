import React, { FC, useEffect, useMemo } from 'react'
import { Box, Card, CardContent, Divider, LinearProgress } from '@mui/material'
import { SenderShipmentOrderOverviewState } from './SenderShipmentOrderOverviewState'
import { useParams } from 'react-router-dom'
import { AddressDetails } from '../../../../address/components/ShowAddressDetails'
import { ShipmentDetailsInfo } from '../SenderShowShipmentDetails'
import { FulfillmentInformation } from '../FulfillmentInformation/FulfillmentInformation'
import { theme } from '../../../../theme/theme'

const SenderShipmentOrderOverview: FC = () => {
  const state = useMemo(() => new SenderShipmentOrderOverviewState(), []).use()
  state.useCleanup()
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
        <Box>
          {fulfillment && <FulfillmentInformation fulfillment={fulfillment} />}
        </Box>
      </CardContent>
    </Card>
  )
}

export { SenderShipmentOrderOverview }
