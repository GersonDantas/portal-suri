import { HttpClient, HttpStatusCode } from 'src/data/protocols/http'
import { InvalidCredentialsError } from 'src/domain/errors/http'
import { UnexpectedError } from 'src/domain/errors/http/unexpected-error'
import { Authentication } from 'src/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Session>
  ) { }

  async auth (params: Authentication.Params): Promise<Authentication.Session> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      body: params,
      method: 'post'
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as Authentication.Session
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteAuthentication {
  export type Session = Authentication.Session
}
