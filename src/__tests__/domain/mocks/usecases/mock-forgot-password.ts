import { mockForgotPasswordResponseModel } from 'src/__tests__/data/mock'
import { ForgotPasswordResponseModel } from 'src/domain/models'
import { ForgotYourPassword } from 'src/domain/usecases'

export class ForgotYourPasswordSpy implements ForgotYourPassword {
  response = mockForgotPasswordResponseModel()
  email: string
  callsCount = 0

  async sendEmail (email: string): Promise<ForgotPasswordResponseModel> {
    this.email = email
    this.callsCount++
    return Promise.resolve(this.response)
  }
}
