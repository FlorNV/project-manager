import { Outlet } from 'react-router-dom'
import { styled } from 'styled-components'

const Header = styled.header`
display: flex;
align-items: center;
padding: 0 16px;
height: 40px;
background-color: ${({ theme }) => theme.colors.white};
font-family: ${({ theme }) => theme.fontSize.text_sm};
font-weight: ${({ theme }) => theme.fontWeight.font_semibold};
line-height: 32px;
color: ${({ theme }) => theme.colors.grey_04};
`

const Line = styled.div`
background-color: ${({ theme }) => theme.colors.white};
`

export const Navigation = () => {
  return (
    <>
      <Header>
        <h2>LOGO</h2>
        <Line />
      </Header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
