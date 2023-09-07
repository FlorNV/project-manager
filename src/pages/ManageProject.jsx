import { useParams } from 'react-router-dom'

export const ManageProject = () => {
  const { id } = useParams()
  return (
    <>
      <h1>ManageProject</h1>
      <p>{id}</p>
    </>
  )
}
