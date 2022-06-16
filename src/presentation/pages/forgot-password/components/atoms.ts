import { atom } from 'recoil'

export const forgotPasswordPageState = atom({
  key: 'forgotPasswordPageState',
  default: {
    isLoading: false,
    forgotPassword: '',
    forgotPasswordError: '',
    forgotPasswordConfirmation: '',
    forgotPasswordConfirmationError: '',
    mainInfo: '',
    isError: false
  }
})
