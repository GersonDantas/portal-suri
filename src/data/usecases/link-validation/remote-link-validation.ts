import { mockLinkValidationResponse } from 'src/__tests__/data/mock/mock-link-validation-response'
import { LinkValidationResponseType } from 'src/data/models'
import { HttpClient } from 'src/data/protocols/http'
import { InvalidResetLinkError, LinkAlreadyUsedError } from 'src/domain/errors'
import { LinkValidation } from 'src/domain/usecases'

export class RemoteLinkValidation implements LinkValidation {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLinkValidation.Model>
  ) { }

  async validate (params: LinkValidation.Params): Promise<RemoteLinkValidation.Model> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.email}:${params.exp}`,
      body: JSON.stringify(params.hash),
      method: 'post'
    })

    switch (httpResponse.body?.type) {
      case LinkValidationResponseType.InvalidResetLink:
        throw new InvalidResetLinkError()
      case LinkValidationResponseType.LinkAlreadyUsed:
        throw new LinkAlreadyUsedError()
      default:
        return Promise.resolve(mockLinkValidationResponse())
    }
  }
}

export namespace RemoteLinkValidation {
  export type Model = LinkValidation.Response
}
