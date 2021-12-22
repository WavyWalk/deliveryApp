import { FC } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const sideBarItems = [
  {
    text: 'Create shipment',
    link: '/sender/createShipment',
    icon: <DirectionsBikeIcon />
  }
]

const SenderSidebar: FC<{
  isMobileOpen: boolean
  sideBarWidth: number
  onSideBarToggle: () => void
}> = ({ sideBarWidth, onSideBarToggle, isMobileOpen }) => {
  const sidebarContent = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {sideBarItems.map((sideBarItem) => (
          <Link
            sx={{ display: 'flex', flexDirection: 'row' }}
            to={sideBarItem.link}
            component={RouterLink}
            key={sideBarItem.text}
          >
            <ListItem button>
              <ListItemText primary={sideBarItem.text} />
              <ListItemIcon>{sideBarItem.icon}</ListItemIcon>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )

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
        {sidebarContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: sideBarWidth }
        }}
        open
      >
        {sidebarContent}
      </Drawer>
    </Box>
  )
}

export { SenderSidebar }
