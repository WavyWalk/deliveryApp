import { FC } from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import * as React from 'react'
import { TopBarLoginInfo } from '../../../user/components/TopBarLoginInfo/TopBarLoginInfo'
import { Box } from '@mui/material'

const TopBar: FC<{
  sideBarWidth: number
  onSideBarToggle: () => void
}> = ({ sideBarWidth, onSideBarToggle, children }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${sideBarWidth}px)` },
        ml: { sm: `${sideBarWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onSideBarToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ marginLeft: 'auto' }}>
          <TopBarLoginInfo />
        </Box>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export { TopBar }
