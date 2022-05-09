import { SessionModel } from '../models'

import faker from '@faker-js/faker'



export const mockSettings = (): SessionModel.Settings => {
  return {
    environment: faker.random.arrayElement(['PROD', 'STG', 'DEV']),
    chatAppId: faker.datatype.uuid(),
    webChatUrl: faker.internet.url(),
    version: faker.random.word(),
    pliqSurveyUrl: faker.internet.url()
  }
}
