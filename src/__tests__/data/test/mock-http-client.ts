import { HttpClient, HttpMethod, HttpStatusCode } from 'src/data/protocols/http'

import faker from '@faker-js/faker'

export const mockHttpRequest = (): HttpClient.Request => ({
  url: faker.internet.url(),
  body: faker.random.objectElement({}),
  method: faker.random.arrayElement(['post', 'get', 'put', 'delete'])
})

export class HttpClientSpy<Resp = any> implements HttpClient<Resp> {
  url?: string
  body?: any
  method: HttpMethod
  response: HttpClient.Response<Resp>
  headers?: any

  constructor (response?: HttpClient.Response<Resp>) {
    if (response) {
      this.response = response
    } else {
      this.response = {
        statusCode: HttpStatusCode.ok
      }
    }
  }

  async request (params: HttpClient.Request): Promise<HttpClient.Response> {
    this.url = params.url
    this.body = params.body
    this.method = params.method
    this.headers = params.headers
    return await Promise.resolve(this.response)
  }
}
