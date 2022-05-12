import { mockPlatformUser } from './mock-platform-user'

import { SessionModel } from 'src/domain/models'
import { Authentication } from 'src/domain/usecases'

import faker from '@faker-js/faker'


export const mockSession = (): Authentication.Session => ({
  platformUser: mockPlatformUser(),
  name: faker.random.words(),
  authenticationType: faker.random.words(),
  isAuthenticated: faker.datatype.boolean(),
  settings: mockSettings(),
  tokenSession: faker.datatype.uuid()
})


export const mockSettings = (): SessionModel.Settings => {
  return {
    environment: faker.random.arrayElement(['PROD', 'STG', 'DEV']),
    chatAppId: faker.datatype.uuid(),
    webChatUrl: faker.internet.url(),
    version: faker.random.word(),
    pliqSurveyUrl: faker.internet.url()
  }
}
