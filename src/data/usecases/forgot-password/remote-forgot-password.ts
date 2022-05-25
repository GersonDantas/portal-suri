import { HttpPostClient } from 'src/data/protocols/http'
import { ForgotYourPassword } from 'src/domain/usecases'

export class RemoteForgotPassword implements ForgotYourPassword {
  constructor (
    private readonly url: string,
    private readonly HttpClient: HttpPostClient
  ) { }

  async forgot (email: string): Promise<boolean> {
    return Promise.resolve(this.HttpClient.post({ url: this.url }) !== undefined)
  }
}
