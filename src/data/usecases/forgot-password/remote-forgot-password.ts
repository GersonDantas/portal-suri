import { ForgotPasswordResponseType } from 'src/data/models'
import { HttpClient } from 'src/data/protocols/http'
import { UserNotFoundError } from 'src/domain/errors'
import { IsFacebookError } from 'src/domain/errors/is-facebook-error'
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
      body: email
    })

    switch (httpResponse.body.type) {
      case ForgotPasswordResponseType.IsFacebookUser:
        throw new IsFacebookError()
      case ForgotPasswordResponseType.UserNotFound:
        throw new UserNotFoundError()
      default:
        return httpResponse.body
    }
  }
}

export namespace RemoteForgotPassword {
  export type Model = ForgotYourPassword.Response
}
