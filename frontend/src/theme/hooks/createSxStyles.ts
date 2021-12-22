import { SxProps, Theme } from '@mui/material'

type StylesFactory = <T extends Record<string, SxProps>>(theme: Theme) => T
