import React, { FC } from 'react'
import { Address } from '../model/Address'
import { Box, Typography } from '@mui/material'
import { Addressee } from '../../addressee/model/Addressee'

export const AddressDetails: FC<{
  address: Address
  addressee: Addressee
  headline: string
}> = ({ address, addressee, headline }) => {
  return (
    <Box sx={{ padding: (theme) => theme.spacing(0, 3) }}>
      <Box>
        <Typography fontWeight={'bold'}>{headline}</Typography>
        <Box>
          <Typography>{address.country}</Typography>
          <Typography>{`${address.postalCode}, ${address.locality}`}</Typography>
          <Typography>{`${address.street}, ${address.streetNumber}`}</Typography>
          <Typography>{`${addressee.firstName} ${addressee.lastName}`}</Typography>
          <Typography>
            {addressee.contactPhone ? `Tel: ${addressee.contactPhone} ` : ''}
            {addressee.contactEmail ? `Email: ${addressee.contactEmail}` : ''}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
