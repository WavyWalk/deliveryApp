import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './approot/components/App'
import { theme } from './theme/theme'

class AppManager {
  init = () => {
    ReactDOM.render(
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>,
      document.getElementById('app')
    )
  }
}

export const app = new AppManager()
