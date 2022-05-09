import { Authentication } from 'src/domain/usecases'

import faker from '@faker-js/faker'



export const mockAuthenticationParams = (): Authentication.Params => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}
