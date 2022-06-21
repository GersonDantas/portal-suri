import { UserInfoResetPassword } from 'src/domain/usecases'

import { atom } from 'recoil'

export const userInfoResetPasswordState = atom({
  key: 'userInfoResetPasswordState',
  default: {
    setUserInfoResetPassword: null as (userInfo: UserInfoResetPassword) => Promise<void>,
    getUserInfoResetPassword: null as () => Promise<UserInfoResetPassword>
  }
})
