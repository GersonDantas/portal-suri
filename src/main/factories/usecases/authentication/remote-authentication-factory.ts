import { RemoteAuthentication } from 'src/data/usecases'
import { Authentication } from 'src/domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from 'src/main/factories/http'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl('/api/v1/session'), makeAxiosHttpClient())
}
