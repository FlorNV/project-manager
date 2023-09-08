import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'
import { Navbar } from '../components/Navbar'

const Main = styled.main`
padding: 20px 60px;

@media (max-width: 768px) {
  padding: 20px 0;
}
`

export const Navigation = () => {
  return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </>
  )
}
