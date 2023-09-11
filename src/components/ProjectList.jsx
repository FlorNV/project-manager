import { css, styled } from 'styled-components'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectRow } from './ProjectRow'
import { ProjectsContext } from '../context/ProjectsContext'
import { ModalContext } from '../context/ModalContext'

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

const TableRow = styled.tr``

const TableCell = styled.td`
  font-weight: ${({ theme }) => theme.fontWeight.font_medium};
`

const PaginationBar = styled.ul`
  display: flex;
  margin: auto;
  width: max-content;
  height: 40px;
  margin-top: 20px;
  box-shadow: 0px 3px 6px 1px ${({ theme }) => theme.colors.colorShadow};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  
  & > li {
    height: 100%;
    border-radius: inherit;
  }
  
  & > li > button {
    height: 100%;
    width: 40px;
    padding: 0 10px;
    border: none;
    border-left: 1px solid ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
    transition: background-color .15s ease-in-out, color .15s ease-in-out;
  }

  & > li > button:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.black};
  }
`

const ArrowButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  line-height: 0;
`

const IndexButton = styled.button`
  ${({ isCurrent, theme }) => isCurrent
? css`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
  `
: css`
  background-color: ${theme.colors.white};
  `};
`

export const ProjectList = ({ projects }) => {
  const { setProjects } = useContext(ProjectsContext)
  const { isVisible, result, openModal, setResult } = useContext(ModalContext)
  const [isMobile, setIsMobile] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const maxItems = 10
  const pages = Math.ceil(projects.length / maxItems)
  const buttonNumbers = Array.from({ length: pages }, (_, index) => index + 1)

  const firstIndex = (currentPage - 1) * maxItems
  const currentProjects = projects.slice(firstIndex, firstIndex + maxItems)

  const setPreviousPage = () => {
    setCurrentPage((prev) => {
      let current = prev
      if (firstIndex - 1 >= 0) {
        current = prev - 1
      }
      return current
    })
  }

  const setNextPage = () => {
    setCurrentPage((prev) => {
      let current = prev
      if (firstIndex + maxItems < projects.length) {
        current = prev + 1
      }
      return current
    })
  }

  const handleDeleteClick = (projectId) => {
    setItemToDelete(projectId)
    openModal()
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)

    const updateFlag = () => setIsMobile(window.innerWidth <= 768)

    window.addEventListener('resize', updateFlag)

    return () => {
      window.removeEventListener('resize', updateFlag)
    }
  }, [])

  useEffect(() => {
    if (!isVisible && result === 'confirm') {
      setProjects((prev) =>
        prev.filter((project) => project.id !== itemToDelete)
      )
      setResult('')
    }
  }, [isVisible])

  return (
    <>
      {isMobile
        ? (
          <ul>
            {currentProjects.map((project) => (
              <ProjectCard
              key={project.id}
              project={project}
              handleDeleteClick={handleDeleteClick}
            />
            ))}
          </ul>
          )
        : (
          <Table>
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
              {currentProjects.map((project) => (
                <ProjectRow
                key={project.id}
                project={project}
                handleDeleteClick={handleDeleteClick}
              />
              ))}
            </tbody>
          </Table>
          )}
      <PaginationBar>
        <li>
          <ArrowButton onClick={setPreviousPage}><AiOutlineLeft /></ArrowButton>
        </li>
        {buttonNumbers.map((button) => (
          <li key={button}>
            <IndexButton isCurrent={button === currentPage} onClick={() => setCurrentPage(button)}>{button}</IndexButton>
          </li>
        ))}
        <li>
          <ArrowButton onClick={setNextPage}><AiOutlineRight /></ArrowButton>
        </li>
      </PaginationBar>
    </>
  )
}
