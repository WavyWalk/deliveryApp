import { FC } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { SlidableSidebar } from '../../../layoutelements/components/SlidableSidebar/SlidableSidbar'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle'

const sideBarItems = [
  {
    text: 'Open shipments pool',
    link: '/deliverer',
    icon: <PlaylistAddCircleIcon />
  },
  {
    text: 'my shipments in fulfillment',
    link: '/deliverer',
    icon: <DirectionsBikeIcon />
  },
  {
    text: 'My completed shipments',
    link: '/deliverer',
    icon: <PlaylistAddCheckCircleIcon />
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
