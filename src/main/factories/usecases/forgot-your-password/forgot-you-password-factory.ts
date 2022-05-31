import { makeApiUrl, makeAxiosHttpClient } from '../../http'
import { RemoteForgotPassword } from 'src/data/usecases'
import { ForgotYourPassword } from 'src/domain/usecases'

export const makeForgotYourPassword = (): ForgotYourPassword => {
  return new RemoteForgotPassword(makeApiUrl('/api/v1/session/reset-password/'), makeAxiosHttpClient())
}
