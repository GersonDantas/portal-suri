import { LinkValidationResponseType } from 'src/data/models'
import { HttpClient, HttpStatusCode } from 'src/data/protocols/http'
import { InvalidResetLinkError, LinkAlreadyUsedError, UnexpectedError } from 'src/domain/errors'
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

    const { statusCode } = httpResponse

    switch (statusCode) {
      case HttpStatusCode.ok:
        return caseHttpStatusCodeOk(httpResponse)
      default: throw new UnexpectedError()
    }
  }
}

const caseHttpStatusCodeOk = (httpResponse: HttpClient.Response): RemoteLinkValidation.Model => {
  switch (httpResponse.body?.type) {
    case LinkValidationResponseType.ValidResetLink:
      return httpResponse.body
    case LinkValidationResponseType.InvalidResetLink:
      throw new InvalidResetLinkError()
    case LinkValidationResponseType.LinkAlreadyUsed:
      throw new LinkAlreadyUsedError()
    default:
      throw new UnexpectedError()
  }
}

export namespace RemoteLinkValidation {
  export type Model = LinkValidation.Response
}
