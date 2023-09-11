import { createContext, useState } from 'react'

export const ModalContext = createContext({
  isVisible: false,
  closeModal: () => {},
  openModal: () => {},
  handleModal: () => {},
  result: '',
  setResult: () => {}
})

export const ModalProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [result, setResult] = useState('')

  const closeModal = () => setIsVisible(false)

  const openModal = () => setIsVisible(true)

  const handleModal = () => setIsVisible(prev => !prev)

  const value = {
    isVisible,
    result,
    setResult,
    closeModal,
    openModal,
    handleModal
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
