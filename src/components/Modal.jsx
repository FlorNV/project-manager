import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineClose } from 'react-icons/ai'
import { ModalContext } from '../context/ModalContext'

const Layer = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  min-width: 300px;
  height: 180px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;

  & > button {
    padding: 6px 12px;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: -14px;
  right: -14px;
  line-height: 0;
  padding: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.tertiary};
  cursor: pointer;
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
background-color: ${({ cancel, theme }) => cancel ? theme.colors.grey_02 : theme.colors.primary};
color: ${({ theme }) => theme.colors.white};
font-size: ${({ theme }) => theme.fontSize.text_lg};
cursor: pointer;
transition: box-shadow .15s ease-in-out;

&:hover {
  box-shadow: 0 0 0 0.25rem ${({ cancel }) => cancel ? '#00000026' : 'rgba(245, 34, 45,.25)'};
}
`

export const Modal = () => {
  const { setResult, closeModal } = useContext(ModalContext)

  const cancelOperation = () => {
    setResult('cancel')
    closeModal()
  }

  const confirmOperation = () => {
    setResult('confirm')
    closeModal()
  }

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        cancelOperation()
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <Layer onClick={cancelOperation}>
      <ModalContainer onClick={(event) => event.stopPropagation()}>
        <CloseButton onClick={cancelOperation}><AiOutlineClose /></CloseButton>
        <h3>This project will be permanently removed.</h3>
        <p>You will not be able to undo this action.</p>
        <ButtonContainer>
          <Button cancel onClick={cancelOperation}>Cancel</Button>
          <Button onClick={confirmOperation}>Delete project</Button>
        </ButtonContainer>
      </ModalContainer>
    </Layer>
  )
}
