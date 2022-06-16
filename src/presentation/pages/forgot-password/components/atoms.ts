import { atom } from 'recoil'

export const forgotPasswordPageState = atom({
  key: 'forgotPasswordPageState',
  default: {
    isLoading: false,
    forgotPassword: '',
    forgotPasswordError: '',
    forgotPasswordConfirmation: '',
    forgotPasswordConfirmationError: '',
    isFormInvalid: true,
    mainInfo: '',
    isError: false
  }
})
