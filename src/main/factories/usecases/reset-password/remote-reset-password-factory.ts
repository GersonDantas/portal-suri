import { RemoteResetPassword } from 'src/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from 'src/main/factories/http'

export const makeRemoteResetPassword = (): RemoteResetPassword => {
  return new RemoteResetPassword(makeApiUrl('/api/v1/session/reset-password'), makeAxiosHttpClient())
}
