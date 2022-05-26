import { HttpClient } from 'src/data/protocols/http'
import { ForgotYourPassword } from 'src/domain/usecases'

export class RemoteForgotPassword implements ForgotYourPassword {
  constructor (
    private readonly url: string,
    private readonly HttpClient: HttpClient
  ) { }

  async forgot (email: string): Promise<boolean> {
    return await Promise.resolve(this.HttpClient.request({
      url: this.url,
      method: 'post',
      body: email
    }) !== undefined)
  }
}
