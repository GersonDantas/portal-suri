import { UserInfoResetPassword } from 'src/domain/usecases'
import { makeLocalStorageAdapter } from 'src/main/factories/cache'

export const setUserInfoResetPasswordAdapter = async (userInfo: UserInfoResetPassword): Promise<void> => {
  await makeLocalStorageAdapter().set('user.info.reset.password', userInfo)
}

export const getUserInfoResetPasswordAdapter = async (): Promise<UserInfoResetPassword> => {
  return await makeLocalStorageAdapter().get<UserInfoResetPassword>('user.info.reset.password')
}
