import { Authentication } from '@/domain/usecases'

import faker from '@faker-js/faker'

export const mockAuthenticationParams = (): Authentication.Params => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
