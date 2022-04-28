import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialError } from '@/domain/errors/http'
import { UnexpectedError } from '@/domain/errors/http/unexpected-error'
import { Authentication } from '@/domain/usecases'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient
  ) { }

  async auth (params: Authentication.Params): Promise<void> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialError()
      default: throw new UnexpectedError()
    }
  }
}
