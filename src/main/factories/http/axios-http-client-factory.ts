import { AxiosHttpClient } from 'src/services/http'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
