import { HttpClient } from 'src/data/protocols/http'
import { ResetPassword } from 'src/domain/usecases'

export class RemoteResetPassword implements ResetPassword {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) { }

  async reset (params: ResetPassword.Params): Promise<ResetPassword.Response> {
    await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params
    })
    return Promise.resolve(true)
  }
}
