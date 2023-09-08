import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme.js'
import GlobalStyle from './styles/globalStyles.js'
import { ProjectsProvider } from './context/ProjectsContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProjectsProvider>
        <GlobalStyle />
        <App />
      </ProjectsProvider>
    </ThemeProvider>
  </React.StrictMode>
)
