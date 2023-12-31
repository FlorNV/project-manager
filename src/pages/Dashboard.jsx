import { useContext } from 'react'
import { ProjectList } from '../components/ProjectList'
import { ProjectsContext } from '../context/ProjectsContext'

export const Dashboard = () => {
  const { projects } = useContext(ProjectsContext)

  return (
    <ProjectList projects={projects} />
  )
}
