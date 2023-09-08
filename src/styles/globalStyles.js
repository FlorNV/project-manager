import { createGlobalStyle } from 'styled-components'

const globalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:focus {
        outline: none;
    }

    body {
        font-family: ${({ theme }) => theme.fontFamily.fontBody};
        background-color: ${({ theme }) => theme.colors.tertiary};
    }

    h1, h2, h3 {
        font-family: ${({ theme }) => theme.fontFamily.fontHeading}; 
    }

    li {
        list-style: none;
    }

    a {
        color: ${({ theme }) => theme.colors.black}; 
        text-decoration: none;
    }

    input::placeholder, textarea::placeholder {
        color: ${({ theme }) => theme.colors.secondary};
    }

    input, textarea, button {
        font-family: ${({ theme }) => theme.fontFamily.fontBody};
        color: ${({ theme }) => theme.colors.black};
    }
`

export default globalStyles
