import React, { FC } from 'react'
import {
  availableParcels,
  handlingLabels,
  ShipmentDetails
} from '../../model/ShipmentDetails'
import { Box, Typography } from '@mui/material'

export const ShipmentDetailsInfo: FC<{ shipmentDetails: ShipmentDetails }> = ({
  shipmentDetails
}) => {
  return (
    <Box>
      <Typography fontWeight={'bold'}>Parcel informaton</Typography>
      <Typography>
        parcel size:
        {(availableParcels as Record<any, any>)[shipmentDetails.parcelType!]}
      </Typography>
      {shipmentDetails.safeHandlingLabel !== 'regular' && (
        <Typography fontSize={'bold'}>
          special handling:{' '}
          {
            (handlingLabels as Record<any, any>)[
              shipmentDetails.safeHandlingLabel!
            ]
          }
        </Typography>
      )}
      {shipmentDetails.noteToDeliveryAgent && (
        <Box>
          <Typography>Note to deliverer</Typography>
          <Typography>{shipmentDetails.noteToDeliveryAgent}</Typography>
        </Box>
      )}
    </Box>
  )
}
