/**
* ! Este método será ultilizado quando corrigirem a url da api
*/
import { RemoteLinkValidation } from 'src/data/usecases'
import { makeApiUrl, makeAxiosHttpClient } from 'src/main/factories/http'

export const makeRemoteLinkValidation = (): RemoteLinkValidation => {
  return (
    new RemoteLinkValidation(
      makeApiUrl('/api/v1/session/reset-password/check/'),
      makeAxiosHttpClient()
    )
  )
}
