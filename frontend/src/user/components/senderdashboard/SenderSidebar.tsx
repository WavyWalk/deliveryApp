import { FC } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { SlidableSidebar } from '../../../layoutelements/components/SlidableSidebar/SlidableSidbar'

const sideBarItems = [
  {
    text: 'Create shipment',
    link: '/sender/createShipment',
    icon: <DirectionsBikeIcon />
  },
  {
    text: 'List all orders',
    link: '/sender',
    icon: <ListAltIcon />
  }
]

const SenderSidebar: FC<{
  isMobileOpen: boolean
  sideBarWidth: number
  onSideBarToggle: () => void
}> = ({ sideBarWidth, onSideBarToggle, isMobileOpen }) => {
  return (
    <SlidableSidebar
      isMobileOpen={isMobileOpen}
      sideBarWidth={sideBarWidth}
      onSideBarToggle={onSideBarToggle}
    >
      <>
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
      </>
    </SlidableSidebar>
  )
}

export { SenderSidebar }
