import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme.js'
import GlobalStyle from './styles/globalStyles.js'
import { ProjectsProvider } from './context/ProjectsContext'
import { ModalProvider } from './context/ModalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProjectsProvider>
        <ModalProvider>
          <GlobalStyle />
          <App />
        </ModalProvider>
      </ProjectsProvider>
    </ThemeProvider>
  </React.StrictMode>
)
