import { FC } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'

const SlidableSidebar: FC<{
  isMobileOpen: boolean
  sideBarWidth: number
  onSideBarToggle: () => void
}> = ({ sideBarWidth, onSideBarToggle, isMobileOpen, children }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: sideBarWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={isMobileOpen}
        onClose={onSideBarToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sideBarWidth }
        }}
      >
        <div>
          <Toolbar />
          <Divider />
          <List>{children}</List>
        </div>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sideBarWidth }
        }}
        open
      >
        <div>
          <Toolbar />
          <Divider />
          <List>{children}</List>
        </div>
      </Drawer>
    </Box>
  )
}

export { SlidableSidebar }
