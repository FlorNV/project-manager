import { createContext, useState } from 'react'

export const ProjectsContext = createContext({
  projects: [],
  setProjects: () => {},
  filteredProjects: [],
  setFilteredProjects: () => {}
})

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])

  const value = {
    projects,
    setProjects,
    filteredProjects,
    setFilteredProjects
  }

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
}
