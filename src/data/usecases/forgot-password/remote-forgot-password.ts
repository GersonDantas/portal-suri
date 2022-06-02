import { HttpClient, HttpStatusCode } from 'src/data/protocols/http'
import { UnexpectedError, UserNotFoundError, IsFacebookError } from 'src/domain/errors'
import { ForgotPasswordResponseType } from 'src/domain/models'
import { ForgotYourPassword } from 'src/domain/usecases'

export class RemoteForgotPassword implements ForgotYourPassword {
  constructor (
    private readonly url: string,
    private readonly HttpClient: HttpClient<RemoteForgotPassword.Model>
  ) { }

  async sendEmail (email: string): Promise<RemoteForgotPassword.Model> {
    const httpResponse = await this.HttpClient.request({
      url: this.url,
      method: 'post',
      body: JSON.stringify(email),
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })

    const { statusCode } = httpResponse

    switch (statusCode) {
      case HttpStatusCode.ok:
        return caseHttpStatusCodeOk(httpResponse)
      default: throw new UnexpectedError()
    }
  }
}

const caseHttpStatusCodeOk = (httpResponse: HttpClient.Response): RemoteForgotPassword.Model => {
  switch (httpResponse.body?.type) {
    case ForgotPasswordResponseType.ResetLinkSent:
      return httpResponse.body
    case ForgotPasswordResponseType.IsFacebookUser:
      throw new IsFacebookError()
    case ForgotPasswordResponseType.UserNotFound:
      throw new UserNotFoundError()
    default:
      throw new UnexpectedError()
  }
}

export namespace RemoteForgotPassword {
  export type Model = ForgotYourPassword.Response
}
