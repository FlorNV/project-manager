import { styled } from 'styled-components'
import { people } from '../utils/data'
import { MoreMenu } from './MoreMenu'
import { formatDate } from '../utils/format'

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

export const ProjectCard = ({ project, handleDeleteClick }) => {
  const { id, projectName, createdAt } = project
  const creationDate = formatDate(createdAt)
  const assignedTo = people.find((person) => person.id === project.assignedTo)

  return (
    <Li>
      <Container>
        <div>
          <h4>{projectName}</h4>
          <CreationDate>Creation date: {creationDate}</CreationDate>
        </div>
        <MenuContainer>
          <MoreMenu id={id} handleDeleteClick={handleDeleteClick} />
        </MenuContainer>
      </Container>
      <Person>
        <Avatar src={assignedTo.avatar} alt="Avatar" />
        <p>{assignedTo.name}</p>
      </Person>
    </Li>
  )
}
