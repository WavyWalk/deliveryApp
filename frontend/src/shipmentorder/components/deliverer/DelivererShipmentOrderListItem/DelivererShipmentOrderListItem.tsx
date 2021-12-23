import React, { FC, useMemo } from 'react'
import { ShipmentOrder } from '../../../model/ShipmentOrder'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Link,
  Typography
} from '@mui/material'
import { AddressDetails } from '../../../../address/components/ShowAddressDetails'
import { senderSteps } from '../../sender/FulfillmentInformation/FulfillmentInformationState'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FULFILLMENT_STATE } from '../../../../orderfullfillment/model/ShipmentOrderFulfillment'
import { DelivererShipmentOrderListItemState } from './DelivererShipmentOrderListItemState'

const DelivererShipmentOrderListItem: FC<{ shipmentOrder: ShipmentOrder }> = ({
  shipmentOrder
}) => {
  const originAddress = shipmentOrder.originAddress!
  const sender = shipmentOrder.sender!
  const destinationAddress = shipmentOrder.destinationAddress!
  const receiver = shipmentOrder.receiver!
  const fulfillment = shipmentOrder.fulfillment!

  const navigate = useNavigate()

  const state = useMemo(
    () => new DelivererShipmentOrderListItemState(fulfillment),
    [shipmentOrder, fulfillment]
  ).use()

  return (
    <Card
      sx={{
        margin: 2,
        padding: 1.5,
        width: {
          lg: '45%',
          xs: '100%'
        }
      }}
    >
      <CardContent>
        <Typography sx={{ padding: 2.5, textAlign: 'center' }}>
          {shipmentOrder.orderNumber}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              lg: 'row',
              xs: 'column'
            },
            justifyContent: 'center',
            marginBottom: 1.5
          }}
        >
          <Box sx={{ flex: 1, marginBottom: { xs: 2 } }}>
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography fontWeight={'bold'}>
            Status:{' '}
            {
              senderSteps.find((it) => it.key === fulfillment?.currentState)
                ?.name
            }
          </Typography>
          <Link
            to={`/deliverer/shipments/${shipmentOrder._id}`}
            component={RouterLink}
          >
            <Button>Full details</Button>
          </Link>
        </Box>
        {fulfillment?.currentState === FULFILLMENT_STATE.NEW_UNPROCESSED && (
          <>
            <Divider />
            <Box
              sx={{ display: 'flex', justifyContent: 'center', margin: 1.5 }}
              onClick={() => state.acceptOrder(navigate, shipmentOrder._id!)}
            >
              <Button variant={'contained'}>Accept this order</Button>
            </Box>
            {state.isLoading && <LinearProgress />}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { DelivererShipmentOrderListItem }
