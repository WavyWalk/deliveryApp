import { FC } from 'react'
import * as React from 'react'
import { TopBar } from '../../../layoutelements/components/TopBar/TopBar'

const DelivererTopBar: FC<{
  sideBarWidth: number
  onSideBarToggle: () => void
}> = ({ sideBarWidth, onSideBarToggle }) => {
  return (
    <TopBar sideBarWidth={sideBarWidth} onSideBarToggle={onSideBarToggle} />
  )
}

export { DelivererTopBar }
