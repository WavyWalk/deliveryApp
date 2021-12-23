import { SxProps } from '@mui/material'

export const useLoginSxStyles = () => {
  const card: SxProps = {
    width: '60%',
    position: 'absolute',
    top: '20%',
    left: '25%'
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
