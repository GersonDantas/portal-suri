import { HttpClient, HttpStatusCode } from 'src/data/protocols/http'
import { InvalidCredentialsError } from 'src/domain/errors'
import { ResetPassword } from 'src/domain/usecases'

export class RemoteResetPassword implements ResetPassword {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) { }

  async reset (params: ResetPassword.Params): Promise<ResetPassword.Response> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.badRequest:
        throw new InvalidCredentialsError()
    }
    return Promise.resolve(true)
  }
}
