import * as React from 'react'

export const useSideBarControls = () => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  const toggleSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  return {
    isMobileOpen,
    toggleSidebar
  }
}
