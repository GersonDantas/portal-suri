import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    mainError: ''
  }
})
