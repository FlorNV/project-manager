import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard, ManageProject, Navigation } from './pages/index'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation to='/dashboard' replace />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='create' element={<ManageProject />} />
          <Route path='edit/:id' element={<ManageProject />} />
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
