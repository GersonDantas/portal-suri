import { RemoteValidationLink } from 'src/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from 'src/main/factories/http'

export const makeRemoteValidationLink = (): RemoteValidationLink => {
  return (
    new RemoteValidationLink(
      makeApiUrl('/api/v1/session/reset-password/check/'),
      makeAxiosHttpClient()
    )
  )
}
