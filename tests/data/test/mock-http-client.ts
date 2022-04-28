import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'

export class HttpPostClientSpy<Resp = any> implements HttpPostClient<Resp> {
  url?: string
  body?: any
  response: HttpPostClient.Response<Resp> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostClient.Request): Promise<HttpPostClient.Response> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}
