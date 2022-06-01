import { mockForgotPasswordResponse } from 'src/__tests__/data/mock'
import { ForgotPasswordResponse } from 'src/data/models'
import { ForgotYourPassword } from 'src/domain/usecases'

export class ForgotYourPasswordSpy implements ForgotYourPassword {
  email: string
  callsCount = 0

  async sendEmail (email: string): Promise<ForgotPasswordResponse> {
    this.email = email
    this.callsCount++
    return Promise.resolve(mockForgotPasswordResponse())
  }
}
