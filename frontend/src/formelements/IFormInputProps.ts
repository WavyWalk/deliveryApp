import { BaseModel } from '../lib/frontmodel'
import { SubscriptionState } from '../lib/statemanagement'
import { SxProps } from '@mui/material'

export interface IFormInputProps {
  model: BaseModel
  formState: SubscriptionState
  property: string
  validateFunc?: () => void
  sx?: SxProps
}
