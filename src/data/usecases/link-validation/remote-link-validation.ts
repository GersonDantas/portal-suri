import { HttpClient } from 'src/data/protocols/http'
import { LinkValidation } from 'src/domain/usecases'

export class RemoteLinkValidation implements LinkValidation {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<LinkValidation.Response>
  ) { }

  async validate (params: LinkValidation.Params): Promise<LinkValidation.Response> {
    this.httpClient.request({
      url: `${this.url}/${params.email}:${params.exp}`,
      body: JSON.stringify(params.hash),
      method: 'post'
    })
    return Promise.resolve({
      success: true,
      type: 3
    })
  }
}
