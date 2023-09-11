import { Link, useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import { AiOutlinePlus } from 'react-icons/ai'
import Back from '../assets/images/back.svg'
import { Searcher } from './Searcher'

const Header = styled.header`
background-color: ${({ theme }) => theme.colors.white};
`

const Logo = styled.h2`
display: flex;
align-items: center;
padding: 0 16px;
height: 40px;
font-Size: ${({ theme }) => theme.fontSize.text_lg};
font-weight: ${({ theme }) => theme.fontWeight.font_semibold};
line-height: 32px;
color: ${({ theme }) => theme.colors.grey_01};
`

const Line = styled.div`
height: 1px;
background-color: ${({ theme }) => theme.colors.secondary};
`

const Nav = styled.nav`
display: flex;
align-items: center;
justify-content: space-between;
gap: 10px;
padding: 0 16px;
height: 40px;
border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`

const H3 = styled.h3`
width: max-content;
color: ${({ theme }) => theme.colors.headingColor};
font-size: ${({ theme }) => theme.fontSize.text_lg};
`

const LinkStyled = styled(Link)`
width: max-content;
display: flex;
align-items: center;
gap: 6px;
height: 32px;
padding: 0 8px;
border-radius: ${({ theme }) => theme.borderRadius};
background-color: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.white};
font-size: ${({ theme }) => theme.fontSize.text_sm};
`

const BackLink = styled(Link)`
display: flex;
align-items: center;
gap: 10px;
color: ${({ theme }) => theme.colors.headingColor};

& > span {
  font-size: ${({ theme }) => theme.fontSize.text_lg};
  font-weight: ${({ theme }) => theme.fontWeight.font_semibold};
}

& > div {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.text_sm};
  color: ${({ theme }) => theme.colors.textColor};
}

& img {
  width: 16px;
}
`

export const Navbar = () => {
  const location = useLocation()

  return (
    <Header>
      <Logo>LOGO</Logo>
      <Line />
      <Nav>
        { location.pathname.includes('create')
          ? <BackLink to='/'>
            <div>
              <img src={Back} alt="Back to dashboard" />
              Back
            </div>
            <span>Add project</span>
          </BackLink>
          : (location.pathname.includes('edit')
              ? <BackLink to='/'>
                <div>
                  <img src={Back} alt="Back to dashboard" />
                  Back
                </div>
                <span>Edit project</span>
              </BackLink>
              : <>
                <H3>My projects</H3>
                <Searcher />
                <LinkStyled to='/create'>
                  <AiOutlinePlus />
                  Add project
                </LinkStyled>
              </>)
        }
      </Nav>
    </Header>
  )
}
