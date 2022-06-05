import { atom } from 'recoil'

export const validationLinkState = atom({
  key: 'validationLinkState',
  default: {
    success: false,
    mainError: ''
  }
})
