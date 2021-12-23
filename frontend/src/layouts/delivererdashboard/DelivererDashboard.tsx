import * as React from 'react'
import { FC } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import Toolbar from '@mui/material/Toolbar'
import { DelivererSidebar } from './DelivererSidebar'
import { DelivererTopBar } from './DelivererTopBar'
import { useSideBarControls } from '../hooks/useSidebarControls'
import { Navigate, Outlet } from 'react-router-dom'
import { sessionState } from '../../user/SessionState'

const sidebarWidth = 250

const DelivererDashboard: FC = () => {
  const sidebarControls = useSideBarControls()
  const session = sessionState.use()

  if (session.isCurrentUserDeliveryAgent()) {
    return (
      <>
        <Navigate to={'/403'} />
      </>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DelivererTopBar
        sideBarWidth={sidebarWidth}
        onSideBarToggle={sidebarControls.toggleSidebar}
      />
      <DelivererSidebar
        isMobileOpen={sidebarControls.isMobileOpen}
        sideBarWidth={sidebarWidth}
        onSideBarToggle={sidebarControls.toggleSidebar}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${sidebarWidth}px)` }
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export { DelivererDashboard }
