import { ResetPassword } from 'src/domain/usecases'

import faker from '@faker-js/faker'

export const mockResetPasswordParams = (): ResetPassword.Params => ({
  email: faker.internet.email(),
  hash: faker.datatype.uuid(),
  password: faker.internet.password()
})

export const mockResetPasswordResponse = (): ResetPassword.Response => faker.datatype.boolean()

export class RemoteResetPasswordSpy implements ResetPassword {
  response = mockResetPasswordResponse()
  params: ResetPassword.Params
  callsCount = 0

  async reset (params: ResetPassword.Params): Promise<boolean> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.response)
  }
}
