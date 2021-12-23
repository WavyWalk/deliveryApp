import React, { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { sessionState } from '../../SessionState'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

const TopBarLoginInfo: FC = () => {
  const session = sessionState.use()
  const navigate = useNavigate()

  if (
    !sessionState.isCurrentUserSender() &&
    !sessionState.isCurrentUserDeliveryAgent()
  ) {
    return <></>
  }

  return (
    <Box display={'flex'} flexDirection={'row'}>
      <Typography color={'white'}>
        <AccountCircleIcon />
        {sessionState.isCurrentUserSender() && 'Sender'}
        {sessionState.isCurrentUserDeliveryAgent() && 'Deliverer'}
      </Typography>
      <Button
        color={'inherit'}
        sx={{ marginLeft: 1 }}
        onClick={() => session.logout(navigate)}
      >
        <LogoutIcon />
        Logout
      </Button>
    </Box>
  )
}

export { TopBarLoginInfo }
