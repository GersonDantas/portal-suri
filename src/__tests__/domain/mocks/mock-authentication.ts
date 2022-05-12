import { mockSession } from './mock-session'

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
  params: Authentication.Params = mockAuthenticationParams()
  callsCount = 0

  async auth (params: Authentication.Params): Promise<Authentication.Session> {
    this.callsCount++
    this.params = params
    return Promise.resolve(this.session)
  }
}
