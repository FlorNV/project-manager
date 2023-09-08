import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { people } from '../utils/data'
import { MoreMenu } from './MoreMenu'

// Mobile
const Li = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.textColor};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  & h4 {
    font-size: ${({ theme }) => theme.fontSize.text_base};
  }
`

const MenuContainer = styled.div`
  position: relative;
`

const CreationDate = styled.small`
  font-size: ${({ theme }) => theme.fontSize.text_xs};
  color: ${({ theme }) => theme.colors.textColorSecondary};
`

const Person = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: ${({ theme }) => theme.fontSize.text_sm};
  margin-top: 10px;
`

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
`
// Desktop
const TableRow = styled.tr`
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`

const TableCell = styled.td`
  position: relative;

  & > h4 {
    font-size: ${({ theme }) => theme.fontSize.text_base};
    font-weight: ${({ theme }) => theme.fontWeight.font_normal};
  }

  & > small {
    font-size: ${({ theme }) => theme.fontSize.text_sm};
    color: ${({ theme }) => theme.colors.textColorSecondary};
  }

  & > div {
    font-size: ${({ theme }) => theme.fontSize.text_base};
    margin-top: 0;
  }

  & > ul {
    left: -124px;
  }
`

const Tag = styled.span`
  font-size: ${({ theme }) => theme.fontSize.text_base};
  font-weight: ${({ theme }) => theme.fontWeight.font_normal};
  color: ${({ theme }) => theme.colors.grey_02};
  background-color: #f5f5f5;
  padding: 1px 8px 1px 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`

const formatDate = (date) => {
  const dateFormatted = date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  const hourFormatted = date
    .toLocaleTimeString('en-US', {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    })
    .toLowerCase()

  return `${dateFormatted} ${hourFormatted}`
}

export const ProjectCard = ({ project }) => {
  const { id, projectName, createdAt, status } = project
  const creationDate = formatDate(createdAt)
  const assignedTo = people.find((person) => person.id === project.assignedTo)
  const projectManager = people.find(
    (person) => person.id === project.projectManager
  )
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
        ? (
          <Li>
            <Container>
              <div>
                <h4>{projectName}</h4>
                <CreationDate>Creation date: {creationDate}</CreationDate>
              </div>
              <MenuContainer>
                <MoreMenu id={id} />
              </MenuContainer>
            </Container>
            <Person>
              <Avatar src={assignedTo.avatar} alt="Avatar" />
              <p>{assignedTo.name}</p>
            </Person>
          </Li>
          )
        : (
          <TableRow>
            <TableCell>
              <h4>{projectName}</h4>
              <small>Creation date: {creationDate}</small>
            </TableCell>
            <TableCell>
              <Person>
                <Avatar src={projectManager.avatar} alt="Avatar" />
                <p>{projectManager.name}</p>
              </Person>
            </TableCell>
            <TableCell>
              <Person>
                <Avatar src={assignedTo.avatar} alt="Avatar" />
                <p>{assignedTo.name}</p>
              </Person>
            </TableCell>
            <TableCell>
              <Tag>{status ? 'Enabled' : 'Disabled'}</Tag>
            </TableCell>
            <TableCell>
              <MoreMenu id={id} />
            </TableCell>
          </TableRow>
          )}
    </>
  )
}
