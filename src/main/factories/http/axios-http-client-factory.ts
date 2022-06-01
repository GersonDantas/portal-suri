import { AxiosHttpClient } from 'src/infra/http'

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
