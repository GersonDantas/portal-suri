import { PlatformUserModel, CbmTeam } from '@/domain/models'

import faker from '@faker-js/faker'

export const mockPlatformUser = (): PlatformUserModel => {
  return {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    email: faker.internet.email(),
    whatsapp: faker.phone.phoneNumber(),
    cbmTeam: mockCbmTeam(),
    imageUrl: faker.image.avatar(),
    chatBots: mockChatbotItem(),
    lastPing: faker.date.recent(),
    notification: faker.datatype.boolean()
  }
}

const mockCbmTeam = (): CbmTeam => {
  return faker.random.arrayElement([
    CbmTeam.Administrative,
    CbmTeam.CustomerSuccess,
    CbmTeam.Technology,
    CbmTeam.Marketing,
    CbmTeam.Sales,
    CbmTeam.Management
  ])
}

const mockChatbotItem = (): PlatformUserModel.chatbotItem[] => {
  return [{
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    imageUrl: faker.image.avatar()
  }, {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    imageUrl: faker.image.avatar()
  }]
}
