import { useContext } from 'react'
import { ProjectList } from '../components/ProjectList'
import { ProjectsContext } from '../context/ProjectsContext'

export const ProjectsFound = () => {
  const { filteredProjects } = useContext(ProjectsContext)

  return (
    <ProjectList projects={filteredProjects} />
  )
}
