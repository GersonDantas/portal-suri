import { atom } from 'recoil'

export const forgotPasswordPageState = atom({
  key: 'forgotPasswordPageState',
  default: {
    forgotPassword: '',
    forgotError: ''
  }
})
