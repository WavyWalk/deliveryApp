import { SxProps } from '@mui/material'

export const useCreateAccountSxStyles = () => {
  const card: SxProps = {
    width: { lg: '50%', xs: '100%' },
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: '20%',
    left: 0,
    right: 0,
    textAlign: 'center'
  } as const

  const inputs: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 2
  } as const

  const textField: SxProps = {
    width: '100%',
    marginBottom: 1
  } as const

  const submitGroup: SxProps = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  } as const

  return {
    card,
    inputs,
    textField,
    submitGroup
  }
}
