import { mockSession } from 'src/__tests__/domain/mocks'
import { Authentication } from 'src/domain/usecases'

import faker from '@faker-js/faker'

export const mockAuthenticationParams = (): Authentication.Params => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

export class AuthenticationSpy implements Authentication {
  session = mockSession()
  params: Authentication.Params
  callsCount = 0

  async auth (params: Authentication.Params): Promise<Authentication.Session> {
    this.params = params
    this.callsCount++
    return await Promise.resolve(this.session)
  }
}
