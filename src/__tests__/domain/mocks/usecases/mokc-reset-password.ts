import { ResetPassword } from 'src/domain/usecases'

import faker from '@faker-js/faker'

export const mockResetPasswordParams = (): ResetPassword.Params => ({
  email: faker.internet.email(),
  hash: faker.datatype.uuid(),
  password: faker.internet.password()
})
