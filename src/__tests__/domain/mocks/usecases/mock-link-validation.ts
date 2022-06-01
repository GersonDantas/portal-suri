import { LinkValidation } from 'src/domain/usecases'

import faker from '@faker-js/faker'

export const mockLinValidationParams = (): LinkValidation.Params => {
  return {
    email: faker.internet.url(),
    hash: faker.datatype.uuid(),
    exp: faker.datatype.datetime()
  }
}
