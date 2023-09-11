import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { css, styled } from 'styled-components'
import { v4 as uuid } from 'uuid'
import { ProjectsContext } from '../context/ProjectsContext'
import { people } from '../utils/data'
import { useNewProjectForm } from '../hooks/useNewProjectForm'

const Form = styled.form`
width: 664px;
display: flex;
gap: 16px;
flex-direction: column;
margin: auto;
padding: 32px 16px;
border-radius: ${({ theme }) => theme.borderRadius};
background-color: ${({ theme }) => theme.colors.white};
box-shadow: ${({ theme }) => theme.shadows.shadow_02};

@media (max-width: 768px) {
  width: 100%;
}
`

const Field = styled.div`
display: flex;
gap: 10px;
flex-direction: column;

& > label {
  font-size: ${({ theme }) => theme.fontSize.text_base};
}

& > input, & > select {
  height: 40px;
  padding: 0 10px;
  font-size: ${({ theme }) => theme.fontSize.text_lg};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.grey_02};
  border: 1px solid ${({ hasError, theme }) => hasError ? theme.colors.primary : theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  ${({ hasError }) => hasError && css`box-shadow: 0 0 0 0.25rem rgba(245, 34, 45,.25);`}
}

& > p {
  font-size: ${({ theme }) => theme.fontSize.text_base};
  color: ${({ theme }) => theme.colors.primary};
}
`

const Button = styled.button`
height: 40px;
width: max-content;
padding: 8px 16px 8px 16px;
display: flex;
align-items: center;
gap: 6px;
border: none;
border-radius: ${({ theme }) => theme.borderRadius};
background-color: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.white};
font-size: ${({ theme }) => theme.fontSize.text_lg};
cursor: pointer;
transition: box-shadow .15s ease-in-out;

&:hover {
  box-shadow: 0 0 0 0.25rem rgba(245, 34, 45,.25);
}
`

export const ManageProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, setProjects } = useContext(ProjectsContext)
  const [values, dispatch] = useNewProjectForm()
  const [error, setError] = useState({
    projectName: '',
    description: '',
    projectManager: '',
    assignedTo: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const isFormValid = validateForm()
    if (!isFormValid) return

    if (!id) {
      const project = {
        id: uuid(),
        createdAt: new Date(),
        ...values
      }
      setProjects(prev => [...prev, project])
    } else {
      const listUpdated = projects.map(project => project.id === id ? { ...values } : project)
      setProjects(listUpdated)
      navigate('/')
    }
    handleClear()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch({
      type: 'change_value',
      payload: {
        name,
        value
      }
    })
  }

  const validateForm = () => {
    let isFormValid = true
    const errorMessages = {
      projectName: '',
      description: '',
      projectManager: '',
      assignedTo: ''
    }

    if (!values.projectName) {
      isFormValid = false
      errorMessages.projectName = 'The project name is required'
    }

    if (!values.description) {
      isFormValid = false
      errorMessages.description = 'Description is required'
    }

    if (!values.projectManager) {
      isFormValid = false
      errorMessages.projectManager = 'The project manager is required'
    }

    if (!values.assignedTo) {
      isFormValid = false
      errorMessages.assignedTo = 'A person is required for the project'
    }

    setError(errorMessages)
    return isFormValid
  }

  const handleClear = () => {
    dispatch({ type: 'clear' })
  }

  const managers = useMemo(() =>
    people.filter(person => person.id !== values.assignedTo)
  , [values.assignedTo])

  const assignedToList = useMemo(() =>
    people.filter(person => person.id !== values.projectManager)
  , [values.projectManager])

  useEffect(() => {
    if (id) {
      const projectFound = projects.find(project => project.id === id)
      dispatch({
        type: 'load_form',
        payload: projectFound
      })
    }
  }, [])

  return (
    <Form onSubmit={handleSubmit}>
      <Field hasError={error.projectName}>
        <label htmlFor='projectName'>Project name</label>
        <input type="text" id='projectName' name='projectName' value={values.projectName} onChange={handleChange} />
        {error && <p>{error.projectName}</p>}
      </Field>

      <Field hasError={error.description}>
        <label htmlFor='description'>Description</label>
        <input type="text" id='description' name='description' value={values.description} onChange={handleChange} />
        {error && <p>{error.description}</p>}
      </Field>

      <Field hasError={error.projectManager}>
        <label htmlFor='projectManager'>Project manager</label>
        <select id='projectManager' name='projectManager' value={values.projectManager} onChange={handleChange}>
          <option value="">Select a person</option>
          {managers.map((person) =>
            <option key={person.id} value={person.id}>{person.name}</option>)}
        </select>
        {error && <p>{error.projectManager}</p>}
      </Field>

      <Field hasError={error.assignedTo}>
        <label htmlFor='assignedTo'>Assigned to</label>
        <select id='assignedTo' name='assignedTo' value={values.assignedTo} onChange={handleChange}>
          <option value="">Select a person</option>
          {assignedToList.map((person) =>
            <option key={person.id} value={person.id}>{person.name}</option>)}
        </select>
        {error && <p>{error.assignedTo}</p>}
      </Field>

      <Field>
        <label htmlFor='status'>Status</label>
        <select id='status' name='status' value={values.status} onChange={handleChange}>
          <option value='true'>Enabled</option>
          <option value='false'>Disabled</option>
        </select>
      </Field>

      <Button type='submit'>{!id ? 'Create project' : 'Save changes'}</Button>
    </Form>
  )
}
