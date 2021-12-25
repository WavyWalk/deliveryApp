import { SxProps, useTheme } from '@mui/material'

export const useShipmentStepSharedSx = () => {
  const theme = useTheme()

  const plainInput: SxProps = {
    width: '100%',
    marginBottom: 1
  } as const

  const inputWrapBox: SxProps = {
    flex: '1',
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1
  } as const

  const groupByTwoInputs: SxProps = {
    display: 'flex',
    marginTop: 1,
    flexDirection: {
      xs: 'column',
      lg: 'row'
    },
    justifyContent: 'space-around'
  } as const

  const controlButtons: SxProps = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: theme.spacing(1, 2)
  } as const

  const headline: SxProps = {
    marginTop: 2,
    marginBottom: 2
  } as const

  return {
    plainInput,
    inputWrapBox,
    groupByTwoInputs,
    controlButtons,
    headline
  }
}
