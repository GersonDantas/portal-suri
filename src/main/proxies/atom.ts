import { atom } from 'recoil'

export const linkValidationState = atom({
  key: 'linkValidationState',
  default: {
    success: false,
    isLoading: true,
    mainError: '',
    urlWithParams: true
  }
})
