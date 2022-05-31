import { ForgotPasswordResponse, ForgotPasswordResponseType } from 'src/data/models'
import { ForgotYourPassword } from 'src/domain/usecases'

import faker from '@faker-js/faker'

export const mockForgotPasswordResponse = (): ForgotPasswordResponse => ({
  success: faker.datatype.boolean(),
  type: faker.random.arrayElement([
    ForgotPasswordResponseType.IsFacebookUser,
    ForgotPasswordResponseType.UserNotFound,
    ForgotPasswordResponseType.ResetLinkSent
  ])
})
export class ForgotYourPasswordSpy implements ForgotYourPassword {
  email: string
  callsCount = 0

  async sendEmail (email: string): Promise<ForgotPasswordResponse> {
    this.email = email
    this.callsCount++
    return Promise.resolve(mockForgotPasswordResponse())
  }
}
