import { LinkValidationResponse, LinkValidationResponseType } from 'src/data/models'

import faker from '@faker-js/faker'

type params = {
  success?: boolean
}

export const mockLinkValidationResponse = (params?: params): LinkValidationResponse => ({
  success: params?.success || false,
  type: params?.success
    ? LinkValidationResponseType.ValidResetLink
    : faker.random.arrayElement([
      LinkValidationResponseType.InvalidResetLink,
      LinkValidationResponseType.LinkAlreadyUsed
    ])
})
