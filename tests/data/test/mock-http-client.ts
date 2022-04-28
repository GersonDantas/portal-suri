import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  response: HttpPostClient.Response = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostClient.Request): Promise<HttpPostClient.Response> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
