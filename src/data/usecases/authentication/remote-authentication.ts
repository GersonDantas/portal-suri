import { HttpPostClient, HttpStatusCode } from 'src/data/protocols/http'
import { InvalidCredentialError } from 'src/domain/errors/http'
import { UnexpectedError } from 'src/domain/errors/http/unexpected-error'
import { Authentication } from 'src/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<RemoteAuthentication.Session>
  ) { }

  async auth (params: Authentication.Params): Promise<Authentication.Session> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as Authentication.Session
      case HttpStatusCode.unauthorized: throw new InvalidCredentialError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Session = Authentication.Session
}
