import { FC } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { SlidableSidebar } from '../../../layoutelements/components/SlidableSidebar/SlidableSidbar'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'

const sideBarItems = [
  {
    text: 'Shipments pool',
    link: '/deliverer',
    icon: <PlaylistAddCircleIcon />
  }
]

const DelivererSidebar: FC<{
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
            onClick={onSideBarToggle}
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

export { DelivererSidebar }
