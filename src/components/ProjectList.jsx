import { styled } from 'styled-components'
import { useEffect, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'

const Table = styled.table`
width: 100%;
border-collapse: collapse;
border-radius: ${({ theme }) => theme.borderRadius};
background-color: ${({ theme }) => theme.colors.white};
box-shadow: 0px 3px 6px 1px ${({ theme }) => theme.colors.colorShadow};

& tr {
  height: 60px;
}

& td {
  padding: 0 20px;
}
`

const TableHead = styled.thead`
width: 100%;
background-color: ${({ theme }) => theme.colors.tableHeader};
border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`

const TableRow = styled.tr`
`

const TableCell = styled.td`
font-weight: ${({ theme }) => theme.fontWeight.font_medium};
`

export const ProjectList = ({ projects }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateFlag = () => setIsMobile(window.innerWidth <= 768)

    window.addEventListener('resize', updateFlag)

    return () => {
      window.removeEventListener('resize', updateFlag)
    }
  }, [])

  return (
    <>
      {isMobile
        ? <ul>
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </ul>
        : <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project info</TableCell>
              <TableCell>Project Manager</TableCell>
              <TableCell>Assigned to</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </tbody>
        </Table>
      }
    </>
  )
}
