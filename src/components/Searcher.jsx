import { useContext, useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import { ProjectsContext } from '../context/ProjectsContext'

const Container = styled.div`
  margin: 0 auto;
  width: 400px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.tertiary};
  cursor: pointer;
`

const Input = styled.input`
  width: 100%;
  padding: 0 0.5rem;
  border: none;
  border-radius: inherit;
  background-color: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textColorSecondary};
  }
`

export const Searcher = () => {
  const { projects, setFilteredProjects } = useContext(ProjectsContext)
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    setSearching(true)
    const query = event.target.value
    setQuery(query)
    navigate(`/search/${query}`)
  }

  const handleReset = () => {
    setQuery('')
    setSearching(false)
    navigate('/dashboard')
  }

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.projectName.toLowerCase().includes(query.toLowerCase()))
  }, [projects, query])

  useEffect(() => {
    setFilteredProjects(filteredProjects)
  }, [filteredProjects])

  return (
    <Container>
      <form>
        <Label>
          <AiOutlineSearch />
          <Input
            type='text'
            name='query'
            value={query}
            onChange={handleChange}
            placeholder='Search'
          />
          {searching && <AiOutlineClose onClick={handleReset} />}
        </Label>
      </form>
    </Container>
  )
}
