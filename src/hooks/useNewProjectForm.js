import { useReducer } from 'react'

const INITIAL_STATE = {
  projectName: '',
  description: '',
  projectManager: 0,
  assignedTo: 0,
  status: true
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'change_value': {
      const { name, value } = action.payload

      let parsedValue = value
      if (name === 'assignedTo' || name === 'projectManager' || name === 'status') {
        parsedValue = JSON.parse(value)
      }

      return {
        ...state,
        [name]: parsedValue
      }
    }
    case 'clear':
      return INITIAL_STATE
    case 'load_form':
      return {
        ...action.payload
      }
  }
}

export const useNewProjectForm = () => {
  return useReducer(formReducer, INITIAL_STATE)
}
