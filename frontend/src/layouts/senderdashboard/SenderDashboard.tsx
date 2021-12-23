import * as React from 'react'
import { FC } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'

import Toolbar from '@mui/material/Toolbar'
import { SenderSidebar } from './SenderSidebar'
import { SenderTopBar } from './SenderTopBar'
import { useSideBarControls } from './hooks/useSidebarControls'
import { Navigate, Outlet } from 'react-router-dom'
import { sessionState } from '../../user/SessionState'

const sidebarWidth = 250

const SenderDashboard: FC = () => {
  const sidebarControls = useSideBarControls()
  const session = sessionState.use()

  if (!session.isCurrentUserSender()) {
    return (
      <>
        <Navigate to={'/403'} />
      </>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SenderTopBar
        sideBarWidth={sidebarWidth}
        onSideBarToggle={sidebarControls.toggleSidebar}
      />
      <SenderSidebar
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

export { SenderDashboard }
