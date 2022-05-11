import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    mainError: '',
    isFormValid: true,
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório'
  }
})