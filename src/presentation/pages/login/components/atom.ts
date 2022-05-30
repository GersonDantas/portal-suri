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
    mainInfo: ''
  }
})

export const modalState = atom({
  key: 'modalIsOpen',
  default: {
    isOpen: false,
    forgotEmail: '',
    forgotError: '',
    isLoading: false
  }
})
