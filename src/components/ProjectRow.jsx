import { styled } from 'styled-components'
import { people } from '../utils/data'
import { MoreMenu } from './MoreMenu'
import { formatDate } from '../utils/format'

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

export const ProjectRow = ({ project, handleDeleteClick }) => {
  const { id, projectName, createdAt, status } = project
  const creationDate = formatDate(createdAt)
  const assignedTo = people.find((person) => person.id === project.assignedTo)
  const projectManager = people.find(
    (person) => person.id === project.projectManager
  )

  return (
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
        <MoreMenu id={id} handleDeleteClick={handleDeleteClick} />
      </TableCell>
    </TableRow>
  )
}
