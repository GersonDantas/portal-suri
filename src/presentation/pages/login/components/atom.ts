import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    isFormInvalid: true,
    mainInfo: '',
    isError: false
  }
})

export const modalState = atom({
  key: 'modalIsOpen',
  default: {
    isOpen: false,
    forgotEmail: '',
    forgotInfo: '',
    isLoading: false
  }
})
