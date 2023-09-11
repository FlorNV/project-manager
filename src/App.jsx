import { useEffect, useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard, ManageProject, Navigation, ProjectsFound } from './pages/index'
import { ProjectsContext } from './context/ProjectsContext'
import { projects } from './utils/data'
import { Modal } from './components/Modal'
import { ModalContext } from './context/ModalContext'

function App () {
  const { setProjects } = useContext(ProjectsContext)
  const { isVisible } = useContext(ModalContext)

  useEffect(() => {
    setProjects(projects)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='create' element={<ManageProject />} />
          <Route path='edit/:id' element={<ManageProject />} />
          <Route path='search' element={<ProjectsFound />}>
            <Route path=':query' el ement={<ProjectsFound />} />
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/dashboard' />} />
      </Routes>
      {isVisible && <Modal />}
    </BrowserRouter>
  )
}

export default App
