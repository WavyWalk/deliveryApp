import {
  Theme as MuiTheme,
  ThemeOptions as MuiThemeOptions
} from '@mui/material'

declare module '@mui/material' {
  interface Theme extends MuiTheme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions extends MuiThemeOptions {
    status?: {
      danger?: string
    }
  }
}
