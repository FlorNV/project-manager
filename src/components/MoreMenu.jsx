import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { css, styled } from 'styled-components'
import More from '../assets/images/more.svg'
import Edit from '../assets/images/edit.svg'
import Trash from '../assets/images/trash.svg'
import { ModalContext } from '../context/ModalContext'

const MoreButton = styled.button`
  cursor: pointer;
  padding: 0 6px;
  border: none;
  background-color: transparent;
`

const Menu = styled.ul`
  position: absolute;
  top: 90%;
  right: -18px;
  width: 180px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 8px 2px ${({ theme }) => theme.colors.colorShadow};
  z-index: 10;
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `};

  &:after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    right: 16px;
    top: -24px;
    bottom: auto;
    border: 12px solid;
    border-color: transparent transparent ${({ theme }) => theme.colors.white}
      transparent;
  }
`

const Option = styled.li`
  height: 38px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: inherit;

  & > button,
  & > a {
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    text-align: start;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: inherit;
    border: none;
    background-color: inherit;
    font-size: ${({ theme }) => theme.fontSize.text_sm};

    &:hover {
      background-color: ${({ theme }) => theme.colors.tertiary};
    }
  }
`

export const MoreMenu = ({ id, handleDeleteClick }) => {
  const { openModal } = useContext(ModalContext)
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const handleMenu = (event) => {
    event.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const closeMenu = () => setIsOpen(false)

  const handleDelete = () => {
    closeMenu()
    handleDeleteClick(id)
    openModal()
  }

  useEffect(() => {
    const handleClick = (event) => {
      if (
        event.target !== buttonRef.current &&
        event.target !== menuRef.current
      ) {
        closeMenu()
      }
    }

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <>
      <MoreButton onClick={handleMenu}>
        <img src={More} alt="" />
      </MoreButton>
      <Menu
        ref={menuRef}
        isOpen={isOpen}
        onClick={(event) => event.stopPropagation()}
      >
        <Option>
          <Link to={`/edit/${id}`}>
            <img src={Edit} alt="" />
            Edit
          </Link>
        </Option>
        <Option>
          <button onClick={handleDelete}>
            <img src={Trash} alt="" />
            Delete
          </button>
        </Option>
      </Menu>
    </>
  )
}
