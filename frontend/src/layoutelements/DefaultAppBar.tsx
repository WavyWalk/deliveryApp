import { FC } from 'react'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'

const DefaultAppBar: FC = ({ children }) => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export { DefaultAppBar }
