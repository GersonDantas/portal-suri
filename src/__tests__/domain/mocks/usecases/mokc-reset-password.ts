import { ResetPassword } from 'src/domain/usecases'

import faker from '@faker-js/faker'

export const mockResetPasswordParams = (): ResetPassword.Params => ({
  email: faker.internet.email(),
  hash: faker.datatype.uuid(),
  password: faker.internet.password()
})

export const mockResetPasswordResponse = (): ResetPassword.Response => faker.datatype.boolean()

export class RemoteResetPasswordSpy implements ResetPassword {
  params: ResetPassword.Params
  async reset (params: ResetPassword.Params): Promise<boolean> {
    this.params = params
    return Promise.resolve(mockResetPasswordResponse())
  }
}
