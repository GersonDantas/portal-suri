import { atom } from 'recoil'

export const linkValidationState = atom({
  key: 'linkValidationState',
  default: {
    success: false,
    mainError: '',
    urlWithParams: true,
    reload: false
  }
})
