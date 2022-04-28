import { HttpPostClient } from '@/data/protocols/http'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  async post (params: HttpPostClient.Request): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}
